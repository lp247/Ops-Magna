import {List, Range} from 'immutable';
import moment from 'moment';

import checkRecurDateMatch from '../../utils/checkRecurDateMatch';
import {DAY_CHANGE_HOUR, EVENT_FORECAST_DAYS} from '../../utils/constants';
import {getTaskTemplate, getTask, getEvent, getRule, getEventTemplate} from '../../utils/objects';

const idToIndexMapper = (mappedFunc, state, root, id, ...rest) => {
  let index;
  if (id === 'new') {
    index = 0;
  } else {
    index = state.get(root).findIndex(x => x.get('id') === id);
  }
  if (index > -1) {
    return mappedFunc(state, root, index, ...rest);
  } else {
    return state;
  }
}

/**
 * Return a function, which toggles a period list of a task template or event template.
 * @param {List.<Map>} state State to be modified.
 * @param {string} id ID of element to be modified.
 * @param {string} period 'months', 'weeks' or 'days' as toggle selection.
 * @param {List|number} value Toggle value (can be List for full List toggling).
 */
function togglePeriodAtIndex(period) {
  return function(state, root, index, value) {
    let clearDays = false;
    let clearWeeks = false;
    let mod = state;
  
    // Clear days, if weeks have been empty before, because on empty weeks the monthly or yearly day
    // selection is enabled and days of months must be cleared before selecting days of weeks.
    if (state.getIn(['templates', index, 'tmp', period]).size === 0 && period === 'weeks') {
      clearDays = true;
    }
  
    // Clear days and weeks, if months have been empty before, because on empty months the yearly
    // day and week selection is enabled and days / weeks must be cleared before selecting days /
    // weeks of months.
    if (state.getIn(['templates', index, 'tmp', period]).size === 0 && period === 'months') {
      clearDays = true;
      clearWeeks = true;
    }
  
    // Full list toggle, if value is -1.
    if (value === 'all') {

      // Calculate full lists.
      let weeks = state.getIn(['templates', index, 'tmp', 'weeks']);
      let months = state.getIn(['templates', index, 'tmp', 'months']);
      let fulllist;
      switch (period) {
        case 'days': {
          if (weeks.size === 0) {
            if (months.size === 0) {
              fulllist = List(Range(1, 367));
            } else {
              fulllist = List(Range(1, 32));
            }
          } else {
            fulllist = List(Range(1, 8));
          }
          break;
        }
        case 'weeks': {
          if (months.size === 0) {
            fulllist = List(Range(1, 54));
          } else {
            fulllist = List(Range(1, 6));
          }
          break;
        }
        case 'months': {
          fulllist = List(Range(0, 12));
          break;
        }
        default: throw 'Invalid option!';
      }

      // Toggle full lists.
      if (state.getIn(['templates', index, 'tmp', period]).equals(fulllist)) {
        mod = mod.setIn(['templates', index, 'tmp', period], List());
      } else {
        mod = mod.setIn(['templates', index, 'tmp', period], fulllist);
      }

    // Toggle single value (add / remove value to / from list).
    } else {
      let valueIndex = state.getIn(['templates', index, 'tmp', period]).indexOf(value);
      if (valueIndex > -1) {
        mod = mod.deleteIn(['templates', index, 'tmp', period, valueIndex]);
      } else {
        mod = mod.updateIn(['templates', index, 'tmp', period], list => list.push(value));
      }
  
    }
  
    // Clear days like before, but the other way round.
    if (mod.getIn(['templates', index, 'tmp', period]).size === 0 && period === 'weeks') {
      clearDays = true;
    }
  
    // Clear days and weeks like before, but the other way round.
    if (mod.getIn(['templates', index, 'tmp', period]).size === 0 && period === 'months') {
      clearDays = true;
      clearWeeks = true;
    }
  
    // Clear days and weeks, if corresponding boolean is set.
    if (clearDays) mod = mod.setIn(['templates', index, 'tmp', 'days'], List());
    if (clearWeeks) mod = mod.setIn(['templates', index, 'tmp', 'weeks'], List());
  
    // Return modified value.
    return mod;

  }
}
export const toggleDays = (state, id, value) => {
  return idToIndexMapper(togglePeriodAtIndex('days'), state, 'templates', id, value);
}
export const toggleWeeks = (state, id, value) => {
  return idToIndexMapper(togglePeriodAtIndex('weeks'), state, 'templates', id, value);
}
export const toggleMonths = (state, id, value) => {
  return idToIndexMapper(togglePeriodAtIndex('months'), state, 'templates', id, value);
}

// UPDATING VALUES
const updateValueAtIndex = (state, root, index, field, value) => {
  return state.setIn([root, index, 'tmp', field], value);
}
const updateValue = (field, isTemplate) => (state, id, value) => {
  let root = isTemplate ? 'templates' : 'items';
  return idToIndexMapper(updateValueAtIndex, state, root, id, field, value);
}
export const updateItemSummary = updateValue('summ', false);
export const updateTemplateSummary = updateValue('summ', true);
export const updateItemDescription = updateValue('desc', false);
export const updateTemplateDescription = updateValue('desc', true);
export const updateItemDate = updateValue('date', false);
export const updateTemplateStart = updateValue('start', true);
export const updateTemplateEnd = updateValue('end', true);
export const updateTemplateN = updateValue('n', true);
export const updateItemTime = updateValue('time', false);
export const updateTemplateTime = updateValue('time', true);

// RESETTING COUNTER
const resetCounterAtIndex = (state, root, index) => {
  return state.setIn([root, index, 'cnt'], 0);
}
export const resetCounter = (state, id) => {
  return idToIndexMapper(resetCounterAtIndex, state, 'templates', id);
}

// INCREMENTING COUNTERS
const incrementCounterAtIndex = (state, root, index) => {
  return state.setIn([root, index, 'cnt'], state.getIn([root, index, 'cnt']) + 1);
}
export const incrementCounter = (state, id) => {
  return idToIndexMapper(incrementCounterAtIndex, state, 'templates', id);
}

// TOGGLING TASKS
const toggleDoneAtIndex = (state, root, index) => {
  return state.setIn(
    ['items', index, 'tmp', 'done'],
    !state.getIn(['items', index, 'tmp', 'done'])
  );
}
export const toggleDone = (state, id) => idToIndexMapper(toggleDoneAtIndex, state, 'items', id);

// DISCARDING
const discardEntityAtIndex = (state, root, index) => {
  return state.setIn([root, index, 'tmp'], state.getIn([root, index, 'data']));
}
const discardEntity = (isTemplate) => (state, id) => {
  return idToIndexMapper(discardEntityAtIndex, state, isTemplate ? 'templates' : 'items', id);
}
export const discardItem = discardEntity(false);
export const discardTemplate = discardEntity(true);

// REMOVING
const removeTemplateAtIndex = (state, root, index) => {
  if (index === 0) {
    return discardEntityAtIndex(state, 'templates', index);
  } else {
    let parentID = state.getIn(['templates', index, 'id']);
    return state
      .updateIn(['items'], list => list.filterNot(x => {
        return x.get('tid') === parentID;
      }))
      .deleteIn(['templates', index]);
  }
}
const removeItemAtIndex = (state, root, index) => {
  if (index === 0) {
    return discardEntityAtIndex(state, 'items', index);
  } else {
    return state.deleteIn(['items', index]);
  }
}
export const removeItem = (state, id) => idToIndexMapper(removeItemAtIndex, state, 'items', id);
export const removeTemplate = (state, id) => idToIndexMapper(removeTemplateAtIndex, state, 'templates', id);

// SAVING ITEMS
const saveItemChangesAtIndex = (state, root, index, newEntity, idGenerator, newtid) => {
  if (index === 0) {
    return state.updateIn(['items'], list => {
      let newObj = list.get(0);
      newObj = newObj.set('id', idGenerator());
      newObj = newObj.set('data', newObj.get('tmp'));
      if (newtid) newObj = newObj.set('tid', newtid);
      return list.push(newObj).set(0, newEntity);
    });
  } else {
    return state.setIn(['items', index, 'data'], state.getIn(['items', index, 'tmp']));
  }
}
export const saveTaskChanges = (state, id, idGenerator, newtid = '') => {
  let newObj = getTask('new');
  return idToIndexMapper(saveItemChangesAtIndex, state, 'items', id, newObj, idGenerator, newtid);
}
export const saveEventChanges = (state, id, idGenerator, newtid = '') => {
  let newObj = getEvent('new');
  return idToIndexMapper(saveItemChangesAtIndex, state, 'items', id, newObj, idGenerator, newtid);
}
export const saveRuleChanges = (state, id, idGenerator) => {
  let newObj = getRule('new');
  return idToIndexMapper(saveItemChangesAtIndex, state, 'items', id, newObj, idGenerator, undefined);
}

// SAVING TEMPLATES
const saveTaskTemplateChangesAtIndex = (state, root, index, newEntity, today, idGenerator) => {
  let mod = state;
  let parentID;

  // Save important data before manipulation.
  let summ = mod.getIn(['templates', index, 'tmp', 'summ']);
  let desc = mod.getIn(['templates', index, 'tmp', 'desc']);
  let time = mod.getIn(['templates', index, 'tmp', 'time']);
  let newM = mod.getIn(['templates', index, 'tmp', 'months']);
  let newW = mod.getIn(['templates', index, 'tmp', 'weeks']);
  let newD = mod.getIn(['templates', index, 'tmp', 'days']);
  let newSD = mod.getIn(['templates', index, 'tmp', 'start']);
  let newEnd = mod.getIn(['templates', index, 'tmp', 'end']);

  // Check, whether a new child matches today.
  let newToday = checkRecurDateMatch(newM, newW, newD, newSD, newEnd, today, 1, 0);

  // If the template is new, no childs have to be considered.
  if (index === 0) {
    parentID = idGenerator();
    mod = mod.updateIn(['templates'], list => {
      let newObj = list.get(0);
      newObj = newObj.set('id', parentID);
      newObj = newObj.set('data', newObj.get('tmp'));
      return list.push(newObj).set(0, newEntity);
    });

  // Changing existing templates requires changing existing childs.
  } else {

    // Get id of parent template.
    parentID = mod.getIn(['templates', index, 'id']);

    // Get index of the child.
    let childIndex = mod.get('items').findIndex(x => {
      return x.get('tid') === parentID;
    });

    // Check if the child is today and if the new child would be today.
    if (childIndex > -1) {
      let oldDate = mod.getIn(['items', childIndex, 'data', 'date']);
      let oldMatch = checkRecurDateMatch(newM, newW, newD, newSD, newEnd, oldDate, 1, 0);
      if (oldMatch && !newToday) {
        mod = mod
          .setIn(['items', childIndex, 'tmp', 'summ'], mod.getIn(['templates', index, 'tmp', 'summ']))
          .setIn(['items', childIndex, 'tmp', 'desc'], mod.getIn(['templates', index, 'tmp', 'desc']))
          .setIn(['items', childIndex, 'tmp', 'time'], mod.getIn(['templates', index, 'tmp', 'time']))
          .setIn(['items', childIndex, 'data', 'summ'], mod.getIn(['templates', index, 'tmp', 'summ']))
          .setIn(['items', childIndex, 'data', 'desc'], mod.getIn(['templates', index, 'tmp', 'desc']))
          .setIn(['items', childIndex, 'data', 'time'], mod.getIn(['templates', index, 'tmp', 'time']));
      } else {
        mod = mod.deleteIn(['items', childIndex]);
      }
    }

    // Save template.
    mod = mod.setIn(['templates', index, 'data'], state.getIn(['templates', index, 'tmp']));
  
  }

  // If a new child matches today, create it.
  if (newToday) {
    mod = mod.updateIn(['items'], list => {
      let id = idGenerator();
      return list.push(getTask(id, parentID, summ, desc, today.format('YYYY-MM-DD'), time, false));
    });
  }

  return mod;
}
export const saveTaskTemplateChanges = (state, id, today, idGenerator) => {
  let newObj = getTaskTemplate('new');
  return idToIndexMapper(saveTaskTemplateChangesAtIndex, state, 'templates', id, newObj, today, idGenerator);
}

const saveEventTemplateChangesAtIndex = (state, root, index, newEntity, today, idGenerator) => {
  let mod = state;
  let parentID;

  // Save important data before manipulation.
  let summ = mod.getIn(['templates', index, 'tmp', 'summ']);
  let desc = mod.getIn(['templates', index, 'tmp', 'desc']);
  let time = mod.getIn(['templates', index, 'tmp', 'time']);
  let newM = mod.getIn(['templates', index, 'tmp', 'months']);
  let newW = mod.getIn(['templates', index, 'tmp', 'weeks']);
  let newD = mod.getIn(['templates', index, 'tmp', 'days']);
  let newSD = mod.getIn(['templates', index, 'tmp', 'start']);
  let newEnd = mod.getIn(['templates', index, 'tmp', 'end']);

  // If the template is new, no childs have to be considered.
  if (index === 0) {
    parentID = idGenerator();
    mod = mod.updateIn(['templates'], list => {
      let newObj = list.get(0);
      newObj = newObj.set('id', parentID);
      newObj = newObj.set('data', newObj.get('tmp'));
      return list.push(newObj).set(0, newEntity);
    });

  // Changing existing templates requires changing existing childs.
  } else {

    // Get id of parent template.
    parentID = mod.getIn(['templates', index, 'id']);

    // Filter out childs. New ones will be inserted afterwards.
    mod = mod.updateIn(['items'], list => list.filterNot(x => x.get('tid') === parentID));

    // Save template.
    mod = mod.setIn(['templates', index, 'data'], state.getIn(['templates', index, 'tmp']));
  
  }

  // Create new childs in forecast.
  for (let i = 0; i <= EVENT_FORECAST_DAYS; i++) {
    let checkDate = today.clone().add(i, 'days');
    let dateMatch = checkRecurDateMatch(newM, newW, newD, newSD, newEnd, checkDate, 1, 0);
    if (dateMatch) {
      mod = mod.updateIn(['items'], list => {
        let id = idGenerator();
        return list.push(getEvent(id, parentID, summ, desc, checkDate.format('YYYY-MM-DD'), time));
      });
    }
  }

  return mod;
}
export const saveEventTemplateChanges = (state, id, today, idGenerator) => {
  let newObj = getEventTemplate('new');
  return idToIndexMapper(saveEventTemplateChangesAtIndex, state, 'templates', id, newObj, today, idGenerator);
}

// UPDATING TASKS AND EVENTS
export const updateTasks = (state, today, idGen) => {
  let mod = state;

  // Clear all completed tasks of past days.
  mod = mod.updateIn(['items'], list => list.filterNot(x => {
    return today.clone().subtract(DAY_CHANGE_HOUR, 'hours').isAfter(x.getIn(['data', 'date']), 'day')
      && x.getIn(['data', 'done']);
  }));

  // Clear all old or full task templates without any childs.
  mod = mod.updateIn(['templates'], list => list.filter(x => {
    let hasChilds = mod.get('items').findIndex(y => y.get('tid') === x.get('id')) > -1;
    let notOld = moment(mod.get('lastUpdate')).subtract(DAY_CHANGE_HOUR, 'hours').isBefore(x.getIn(['data', 'end']));
    let notFull = x.get('cnt') < x.getIn(['data', 'n']);
    return hasChilds || (notOld && notFull) || x.get('id') === 'new';
  }));

  // Loop through all task templates.
  let taskTemplates = mod.get('templates');
  for (let i = 1; i < taskTemplates.size; i++) {
    
    // Calculate the relevant date and extract relevant information out of the current event
    // template.
    let tid = taskTemplates.getIn([i, 'id']);
    let months = taskTemplates.getIn([i, 'data', 'months']);
    let weeks = taskTemplates.getIn([i, 'data', 'weeks']);
    let days = taskTemplates.getIn([i, 'data', 'days']);
    let sd = taskTemplates.getIn([i, 'data', 'start']);
    let ed = taskTemplates.getIn([i, 'data', 'end']);
    let n = taskTemplates.getIn([i, 'data', 'n']);
    let cnt = taskTemplates.getIn([i, 'cnt']);
    let summ = taskTemplates.getIn([i, 'data', 'summ']);
    let desc = taskTemplates.getIn([i, 'data', 'desc']);
    let time = taskTemplates.getIn([i, 'data', 'time']);

    // Loop through all relevant days.
    let checkDate = moment(mod.get('lastUpdate'));
    while (checkDate.isBefore(today, 'day')) {
        
      // Move one day ahead.
      checkDate.add(1, 'days');

      // Check, whether the given information matches the given date and if it does,
      // insert a child of the current template into the list of items. If a child of the same
      // template already exists on a previous date, it will be removed.
      let dateCheck = checkRecurDateMatch(months, weeks, days, sd, ed, checkDate, n, cnt);
      if (dateCheck) {
        mod = mod.updateIn(['items'], list => list.filterNot(x => x.get('tid') === tid));
        mod = mod.updateIn(['items'], list => list.push(
          getTask(idGen(), tid, summ, desc, checkDate.format('YYYY-MM-DD'), time, false)
        ));
        cnt = cnt + 1;
      }

    }

    // Update counter.
    mod = mod.setIn(['templates', i, 'cnt'], cnt);

  }

  // Update last update.
  mod = mod.set('lastUpdate', today.format('YYYY-MM-DD'));

  // Return modified state.
  return mod;

}

export const updateEvents = (state, today, idGen) => {
  let mod = state;

  // Clear all old or full event templates without any childs.
  mod = mod.updateIn(['templates'], list => list.filter(x => {
    let hasChilds = mod.get('items').findIndex(y => y.get('tid') === x.get('id')) > -1;
    let notOld = today.clone().subtract(DAY_CHANGE_HOUR, 'hours').isBefore(x.getIn(['data', 'end']));
    let notFull = x.get('cnt') < x.getIn(['data', 'n']);
    return hasChilds || (notOld && notFull) || x.get('id') === 'new';
  }));

  // Clear all previous event childs. All relevant events will be regenerated.
  // mod = mod.updateIn(['items'], list => list.filterNot(x => !!x.get('tid')));

  // Loop through all event templates.
  let eventTemplates = mod.get('templates');
  for (let i = 1; i < eventTemplates.size; i++) {
    
    // Calculate the relevant date and extract relevant information out of the current event
    // template.
    let tid = eventTemplates.getIn([i, 'id']);
    let months = eventTemplates.getIn([i, 'data', 'months']);
    let weeks = eventTemplates.getIn([i, 'data', 'weeks']);
    let days = eventTemplates.getIn([i, 'data', 'days']);
    let sd = eventTemplates.getIn([i, 'data', 'start']);
    let ed = eventTemplates.getIn([i, 'data', 'end']);
    let n = eventTemplates.getIn([i, 'data', 'n']);
    let cnt = eventTemplates.getIn([i, 'cnt']);
    let summ = eventTemplates.getIn([i, 'data', 'summ']);
    let desc = eventTemplates.getIn([i, 'data', 'desc']);
    let time = eventTemplates.getIn([i, 'data', 'time']);

    // Loop through all relevant days.
    let checkDate = moment(mod.get('lastUpdate'));
    while (checkDate.isBefore(today.clone().add(EVENT_FORECAST_DAYS, 'days'), 'day')) {

      // Move one day ahead.
      checkDate.add(1, 'days');

    // Loop through all days of the event forecast.
    // for (let j = 0; j <= EVENT_FORECAST_DAYS; j++) {

      // Check, whether the given information matches the given date and if it does,
      // insert a child of the current template into the list of items.
      let dateCheck = checkRecurDateMatch(months, weeks, days, sd, ed, checkDate, n, cnt);
      if (dateCheck) {
        mod = mod.updateIn(['items'], list => {
          return list.push(getEvent(idGen(), tid, summ, desc, checkDate.format('YYYY-MM-DD'), time))
        });
        cnt = cnt + 1;
      }

    }

    // Update counter.
    mod = mod.setIn(['templates', i, 'cnt'], cnt);
  
  }

  // Clear all events of past days.
  mod = mod.updateIn(['items'], list => list.filterNot(x => {
    return today.clone().subtract(DAY_CHANGE_HOUR, 'hours').isAfter(x.getIn(['data', 'date']), 'day');
  }));

  // Update last update.
  mod = mod.set('lastUpdate', today.add(EVENT_FORECAST_DAYS, 'days').format('YYYY-MM-DD'));

  // Return modified state.
  return mod;

}