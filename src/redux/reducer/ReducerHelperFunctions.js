import {List, Range} from 'immutable';
import moment from 'moment';

import checkRecurDateMatch from '../../utils/checkRecurDateMatch';
import {DAY_CHANGE_HOUR, EVENT_FORECAST_DAYS} from '../../utils/constants';
import {getTaskTemplate, getTask, getEvent, getRule, getEventTemplate} from '../../utils/objects';

// =================================================================================================
//      MAPPING FUNCTION
// =================================================================================================

// const IDIndexMap = (mappedFunc, state, root, id, ...rest) => {
//   let index;
//   if (id === 'new') {
//     index = 0;
//   } else {
//     index = state.get(root).findIndex(x => x.get('id') === id);
//   }
//   if (index > -1) {
//     return mappedFunc(state, root, index, ...rest);
//   } else {
//     return state;
//   }
// }

const IDIndexMap = (root) => (mappedFunc, state, id, ...rest) => {
  let index;
  if (id === 'new') {
    index = 0;
  } else {
    index = state.get(root).findIndex(x => x.get('id') === id);
  }
  if (index > -1) {
    return mappedFunc(state, index, ...rest);
  } else {
    return state;
  }
}

const IDIndexItemMap = IDIndexMap('items');

const IDIndexTemplateMap = IDIndexMap('templates');

// =================================================================================================
//      TOGGLING PERIODS
// =================================================================================================

/**
 * Return a function, which toggles a period list of a task template or event template.
 * @param {List.<Map>} state State to be modified.
 * @param {string} id ID of element to be modified.
 * @param {string} period 'months', 'weeks' or 'days' as toggle selection.
 * @param {List|number} value Toggle value (can be List for full List toggling).
 */
function togglePeriodAtIndex(period) {
  return function(state, index, value) {
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
  
    // Full list toggle, if value is 'all'.
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
        default: throw new Error('Invalid option!');
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
        mod = mod.updateIn(['templates', index, 'tmp', period], list => list.push(value).sort());
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
  return IDIndexTemplateMap(togglePeriodAtIndex('days'), state, id, value);
}

export const toggleWeeks = (state, id, value) => {
  return IDIndexTemplateMap(togglePeriodAtIndex('weeks'), state, id, value);
}

export const toggleMonths = (state, id, value) => {
  return IDIndexTemplateMap(togglePeriodAtIndex('months'), state, id, value);
}

// =================================================================================================
//      UPDATING VALUES
// =================================================================================================

const updateValueAtIndex = (root) => (state, index, field, value) => {
  return state.setIn([root, index, 'tmp', field], value);
}

// const updateValue = (field, isTemplate) => (state, id, value) => {
//   let root = isTemplate ? 'templates' : 'items';
//   return IDIndexMap(updateValueAtIndex, state, root, id, field, value);
// }
// export const updateItemSummary = updateValue('summ', false);
// export const updateTemplateSummary = updateValue('summ', true);
// export const updateItemDescription = updateValue('desc', false);
// export const updateTemplateDescription = updateValue('desc', true);
// export const updateItemDate = updateValue('date', false);
// export const updateTemplateStart = updateValue('start', true);
// export const updateTemplateEnd = updateValue('end', true);
// export const updateTemplateN = updateValue('n', true);
// export const updateItemTime = updateValue('time', false);
// export const updateTemplateTime = updateValue('time', true);
export const updateItemSummary = (state, id, value) => {
  return IDIndexItemMap(updateValueAtIndex('items'), state, id, 'summ', value);
}

export const updateTemplateSummary = (state, id, value) => {
  return IDIndexTemplateMap(updateValueAtIndex('templates'), state, id, 'summ', value);
}

export const updateItemDescription = (state, id, value) => {
  return IDIndexItemMap(updateValueAtIndex('items'), state, id, 'desc', value);
}

export const updateTemplateDescription = (state, id, value) => {
  return IDIndexTemplateMap(updateValueAtIndex('templates'), state, id, 'desc', value);
}

export const updateItemDate = (state, id, value) => {
  return IDIndexItemMap(updateValueAtIndex('items'), state, id, 'date', value);
}

export const updateTemplateStart = (state, id, value) => {
  return IDIndexTemplateMap(updateValueAtIndex('templates'), state, id, 'start', value);
}

export const updateTemplateEnd = (state, id, value) => {
  return IDIndexTemplateMap(updateValueAtIndex('templates'), state, id, 'end', value);
}

export const updateTemplateN = (state, id, value) => {
  return IDIndexTemplateMap(updateValueAtIndex('templates'), state, id, 'n', value);
}

export const updateItemTime = (state, id, value) => {
  return IDIndexItemMap(updateValueAtIndex('items'), state, id, 'time', value);
}

export const updateTemplateTime = (state, id, value) => {
  return IDIndexTemplateMap(updateValueAtIndex('templates'), state, id, 'time', value);
}

// =================================================================================================
//      RESETTING COUNTER
// =================================================================================================

const resetCounterAtIndex = (state, index) => {
  return state.setIn(['templates', index, 'cnt'], 0);
}

export const resetCounter = (state, id) => {
  return IDIndexTemplateMap(resetCounterAtIndex, state, id);
}

// =================================================================================================
//      INCREMENTING COUNTER
// =================================================================================================

const incrementCounterAtIndex = (state, index) => {
  return state.setIn(['templates', index, 'cnt'], state.getIn(['templates', index, 'cnt']) + 1);
}

export const incrementCounter = (state, id) => {
  return IDIndexTemplateMap(incrementCounterAtIndex, state, id);
}

// =================================================================================================
//      TOGGLING TASK
// =================================================================================================

const toggleDoneAtIndex = (state, index) => {
  return state.setIn(
    ['items', index, 'tmp', 'done'],
    !state.getIn(['items', index, 'tmp', 'done'])
  );
}

export const toggleDone = (state, id) => IDIndexItemMap(toggleDoneAtIndex, state, id);

// =================================================================================================
//      DISCARDING
// =================================================================================================

const discardEntityAtIndex = (root) => (state, index) => {
  return state.setIn([root, index, 'tmp'], state.getIn([root, index, 'data']));
}

// const discardEntity = (isTemplate) => (state, id) => {
//   return IDIndexMap(discardEntityAtIndex, state, isTemplate ? 'templates' : 'items', id);
// }

export const discardItem = (state, id) => {
  return IDIndexItemMap(discardEntityAtIndex('items'), state, id);
}

export const discardTemplate = (state, id) => {
  return IDIndexTemplateMap(discardEntityAtIndex('templates'), state, id);
}

// =================================================================================================
//      REMOVING ITEMS
// =================================================================================================

const removeItemAtIndex = (state, index) => {
  if (index === 0) {
    return discardEntityAtIndex('items')(state, index);
  } else {
    return state.deleteIn(['items', index]);
  }
}

export const removeItem = (state, id) => IDIndexItemMap(removeItemAtIndex, state, id);

// =================================================================================================
//      REMOVING TEMPLATES
// =================================================================================================

const removeTemplateAtIndex = (state, index) => {
  if (index === 0) {
    return discardEntityAtIndex('templates')(state, index);
  } else {
    let parentID = state.getIn(['templates', index, 'id']);
    return state
      .updateIn(['items'], list => list.filterNot(x => {
        return x.get('tid') === parentID;
      }))
      .deleteIn(['templates', index]);
  }
}

export const removeTemplate = (state, id) => IDIndexTemplateMap(removeTemplateAtIndex, state, id);

// =================================================================================================
//      SAVING ITEMS
// =================================================================================================

const saveItemChangesAtIndex = (state, index, newEntity, idGenerator, newtid) => {
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
  return IDIndexItemMap(saveItemChangesAtIndex, state, id, newObj, idGenerator, newtid);
}

export const saveEventChanges = (state, id, idGenerator, newtid = '') => {
  let newObj = getEvent('new');
  return IDIndexItemMap(saveItemChangesAtIndex, state, id, newObj, idGenerator, newtid);
}

export const saveRuleChanges = (state, id, idGenerator) => {
  let newObj = getRule('new');
  return IDIndexItemMap(saveItemChangesAtIndex, state, id, newObj, idGenerator, undefined);
}

// =================================================================================================
//      TEMPLATE SAVING HELPER FUNCTIONS
// =================================================================================================

const pushNew = (state, newElementID, emptyNew) => {
  return state.updateIn(['templates'], list => {
    let newObj = list.get(0);
    newObj = newObj.set('id', newElementID);
    newObj = newObj.set('data', newObj.get('tmp'));
    return list.push(newObj).set(0, emptyNew);
  });
}

const setItemSoftDataAtIndex = (state, index, summ, desc, time) => {
  return state
    .setIn(['items', index, 'tmp', 'summ'], summ)
    .setIn(['items', index, 'tmp', 'desc'], desc)
    .setIn(['items', index, 'tmp', 'time'], time)
    .setIn(['items', index, 'data', 'summ'], summ)
    .setIn(['items', index, 'data', 'desc'], desc)
    .setIn(['items', index, 'data', 'time'], time);
}

const rawTemplateSaveAtIndex = (state, index) => {
  return state.setIn(['templates', index, 'data'], state.getIn(['templates', index, 'tmp']));
}

// =================================================================================================
//      SAVING TASK TEMPLATES
// =================================================================================================

const saveTaskTemplateChangesAtIndex = (state, index, today, idGenerator) => {
  let mod = state;
  let trueIndex = index;
  let cnt = mod.getIn(['templates', index, 'cnt']);
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
    mod = pushNew(mod, parentID, getTaskTemplate('new'));
    trueIndex = -1;

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
        mod = setItemSoftDataAtIndex(mod, childIndex, summ, desc, time);
      } else {
        let oldToday = mod.getIn(['items', childIndex, 'data', 'date']) === today.format('YYYY-MM-DD');
        mod = mod.deleteIn(['items', childIndex]);
        if (oldToday) cnt -= 1;
      }
    }

    // Save template.
    mod = rawTemplateSaveAtIndex(mod, index);
  
  }

  // If a new child matches today, create it.
  if (newToday) {
    mod = mod.updateIn(['items'], list => {
      let id = idGenerator();
      return list.push(getTask(id, parentID, summ, desc, today.format('YYYY-MM-DD'), time, false));
    });
    cnt += 1;
  }

  // Update counter.
  mod = mod.setIn(['templates', trueIndex, 'cnt'], cnt);

  return mod;
}

export const saveTaskTemplateChanges = (state, id, today, idGenerator) => {
  return IDIndexTemplateMap(saveTaskTemplateChangesAtIndex, state, id, today, idGenerator);
}

// =================================================================================================
//      SAVING EVENT TEMPLATES
// =================================================================================================

const saveEventTemplateChangesAtIndex = (state, index, today, idGenerator) => {
  let mod = state;
  let trueIndex = index;
  let cnt = mod.getIn(['templates', index, 'cnt']);
  let n = mod.getIn(['templates', index, 'tmp', 'n']);
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
    mod = pushNew(mod, parentID, getEventTemplate('new'));
    trueIndex = mod.getIn(['templates']).size - 1;

  // Changing existing templates requires changing existing childs.
  } else {

    // Get id of parent template.
    parentID = mod.getIn(['templates', index, 'id']);

    // Get number of childs.
    let numChilds = mod.getIn(['items']).filter(x => x.get('tid') === parentID).size;

    // Filter out childs. New ones will be inserted afterwards.
    mod = mod.updateIn(['items'], list => list.filterNot(x => x.get('tid') === parentID));

    // Decrement counter by number of removed childs.
    cnt -= numChilds;

    // Save template.
    mod = rawTemplateSaveAtIndex(mod, index);
  
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
      cnt += 1;
    }
    if (cnt >= n) break;
  }

  // Update counter.
  mod = mod.setIn(['templates', trueIndex, 'cnt'], cnt);

  return mod;
}

export const saveEventTemplateChanges = (state, id, today, idGenerator) => {
  return IDIndexTemplateMap(saveEventTemplateChangesAtIndex, state, id, today, idGenerator);
}

// =================================================================================================
//      UPDATING TASKS
// =================================================================================================

export const updateTasks = (state, today, idGen) => {
  let lastUpdate = state.get('lastUpdate');
  if (moment(today).isAfter(lastUpdate, 'day')) {
    let mod = state;

    // Clear all completed tasks of past days.
    mod = mod.updateIn(['items'], list => list.filterNot(x => {
      return today.clone().subtract(DAY_CHANGE_HOUR, 'hours').isAfter(x.getIn(['data', 'date']), 'day')
        && x.getIn(['data', 'done']);
    }));

    // Clear all old or full task templates without any childs. Task templates are defined old, when
    // the last update of tasks is before the end. The last update is used and not today, because
    // there might be other childs to be generated before removing the template.
    mod = mod.updateIn(['templates'], list => list.filter(x => {
      let hasChilds = mod.get('items').findIndex(y => y.get('tid') === x.get('id')) > -1;
      let notOld = moment(mod.get('lastUpdate'))
        .isBefore(x.getIn(['data', 'end']))
        || !x.getIn(['data', 'end']);
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

  } else {
    return state;
  }
}

// =================================================================================================
//      UPDATING EVENTS
// =================================================================================================

export const updateEvents = (state, today, idGen) => {
  let lastUpdate = state.get('lastUpdate');
  if (moment(today).isAfter(lastUpdate, 'day')) {
    let mod = state;
  
    // Clear all old or full event templates without any childs.
    mod = mod.updateIn(['templates'], list => list.filter(x => {
      let hasChilds = mod.get('items').findIndex(y => y.get('tid') === x.get('id')) > -1;
      let notOld = today.clone().isBefore(x.getIn(['data', 'end']))  || !x.getIn(['data', 'end']);
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

  } else {
    return state;
  }
}