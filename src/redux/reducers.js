import {combineReducers} from 'redux-immutable';
import {List} from 'immutable';
import moment from 'moment';
import _ from 'lodash';
import {
  UPDATE_TASK_TEMPLATE_SUMMARY,
  UPDATE_TASK_TEMPLATE_DESCRIPTION,
  UPDATE_TASK_TEMPLATE_N,
  RESET_TASK_TEMPLATE_COUNTER,
  INCREMENT_TASK_TEMPLATE_COUNTER,
  TOGGLE_TASK_TEMPLATE_MONTH,
  TOGGLE_TASK_TEMPLATE_WEEK,
  TOGGLE_TASK_TEMPLATE_DAY,
  UPDATE_TASK_TEMPLATE_TIME,
  UPDATE_TASK_TEMPLATE_START,
  UPDATE_TASK_TEMPLATE_END,
  UPDATE_EVENT_TEMPLATE_SUMMARY,
  UPDATE_EVENT_TEMPLATE_DESCRIPTION,
  UPDATE_EVENT_TEMPLATE_N,
  RESET_EVENT_TEMPLATE_COUNTER,
  INCREMENT_EVENT_TEMPLATE_COUNTER,
  TOGGLE_EVENT_TEMPLATE_MONTH,
  TOGGLE_EVENT_TEMPLATE_WEEK,
  TOGGLE_EVENT_TEMPLATE_DAY,
  UPDATE_EVENT_TEMPLATE_TIME,
  UPDATE_EVENT_TEMPLATE_START,
  UPDATE_EVENT_TEMPLATE_END,
  UPDATE_RULE_SUMMARY,
  UPDATE_RULE_DESCRIPTION,
  SAVE_TASK_TEMPLATE,
  SAVE_EVENT_TEMPLATE,
  SAVE_RULE,
  DISCARD_TASK_TEMPLATE,
  DISCARD_EVENT_TEMPLATE,
  DISCARD_RULE,
  REMOVE_TASK,
  REMOVE_EVENT,
  REMOVE_TASK_TEMPLATE,
  REMOVE_EVENT_TEMPLATE,
  REMOVE_RULE,
  ADD_TASK,
  ADD_EVENT,
  TOGGLE_TASK,
  TOGGLE_TASK_VISIBILITY_FILTER,
  TOGGLE_EVENT_VISIBILITY_FILTER,
  INCREMENT_WORK_DATE,
  UNSET_SHOULD_SAVE,
  VisibilityFilters
} from './actions';
import {
  newRule,
  newTaskTemplate,
  newEventTemplate
} from '../utils/objects';
import {DAY_CHANGE_HOUR} from '../utils/constants';
const {SHOW_ALL, SHOW_TODAY} = VisibilityFilters;

/**
 * Toggle a period list of a task template or event template
 * @param {List.<Map>} state State to be modified.
 * @param {string} id ID of element to be modified.
 * @param {string} period 'months', 'weeks' or 'days' as toggle selection.
 * @param {List|number} value Toggle value (can be List for full List toggling).
 */
function togglePeriod(state, id, period, value) {
  let index = state.findIndex(x => x.get('id') === id);
  let clearDays = false;
  let clearWeeks = false;
  let mod;
  if (index > -1) {

    // Clear days, if weeks have been empty before, because on empty weeks the monthly or yearly day
    // selection is enabled and days of months must be cleared before selecting days of weeks.
    if (state.getIn([index, 'template', 'weeks']).size === 0 && period === 'weeks') {
      clearDays = true;
    }

    // Clear days and weeks, if months have been empty before, because on empty months the yearly
    // day and week selection is enabled and days / weeks must be cleared before selecting days /
    // weeks of months.
    if (state.getIn([index, 'template', 'months']).size === 0 && period === 'months') {
      clearDays = true;
      clearWeeks = true;
    }

    // Full list toggle, if value is list.
    if (List.isList(value)) {
      if (state.getIn([index, 'template', period]).equals(value)) {
        mod = state.updateIn([index, 'template', period], () => List());
      } else {
        mod = state.updateIn([index, 'template', period], () => value);
      }

    // Toggle single value (add / remove value to / from list).
    } else {
      let valueIndex = state.getIn([index, 'template', period].indexOf(value));
      if (valueIndex > -1) {
        mod = state.updateIn([index, 'template', period], list => list.delete(valueIndex));
      } else {
        mod = state.updateIn([index, 'template', period], list => list.push(value));
      }

    }

    // Clear days like before, but the other way round.
    if (mod.getIn([index, 'template', 'weeks']).size === 0 && period === 'weeks') {
      clearDays = true;
    }

    // Clear days and weeks like before, but the other way round.
    if (mod.getIn([index, 'template', 'months']).size === 0 && period === 'months') {
      clearDays = true;
      clearWeeks = true;
    }

    // Clear days, if boolean is set.
    if (clearDays) {
      mod = mod.updateIn([index, 'template', 'days'], () => List());
    }

    // Clear weeks, if boolean is set.
    if (clearWeeks) {
      mod = mod.updateIn([index, 'template', 'weeks'], () => List());
    }

    // Return modified value.
    return mod;

  } else {
    return state;
  }
}

/**
 * Update a single field of a task template or event template.
 * @param {List.<Map>} state State to be modified.
 * @param {string} id ID of element to be modified.
 * @param {string} field Name of field to be updated.
 * @param {string|number} value New value.
 */
function updateValue(state, id, field, value) {
  let index = state.findIndex(x => x.get('id') === id);
  if (index > -1) {
    return state.setIn([index, 'template', field], value);
  } else {
    return state;
  }
}

/**
 * Increment a number of a task template or event template.
 * @param {List.<Map>} state State to be modified.
 * @param {string} id ID of element to be modified.
 * @param {string} field Name of field to be updated.
 */
function incrementValue(state, id, field) {
  let index = state.findIndex(x => x.get('id') === id);
  if (index > -1) {
    return state.setIn([index, 'template', field], state.getIn([index, 'template', field]) + 1);
  } else {
    return state;
  }
}

function taskVisibilityFilter(state = SHOW_TODAY, action) {
  switch (action.type) {
    case TOGGLE_TASK_VISIBILITY_FILTER:
      if (state === SHOW_TODAY) {
        return SHOW_ALL;
      } else {
        return SHOW_TODAY;
      }
    default:
      return state;
  }
}

function eventVisibilityFilter(state = SHOW_TODAY, action) {
  switch (action.type) {
    case TOGGLE_EVENT_VISIBILITY_FILTER:
      if (state === SHOW_TODAY) {
        return SHOW_ALL;
      } else {
        return SHOW_TODAY;
      }
    default:
      return state;
  }
}

/**
 * Redux reducer for the tasks.
 * 
 * @param {List.<Map>} state List of tasks.
 * @param {Object} action Dispatched action.
 */
function tasks(state = List(), action) {
  switch (action.type) {

    /** Toggle the 'done' property of a task. */
    case TOGGLE_TASK: {
      let index = state.findIndex(el => el.get('id') === action.id);
      if (index > -1) {
        return state.setIn([index, 'done'], !state.getIn([index, 'done']));
      } else {
        return state;
      }
    }

    /** Add a task to the array of tasks. */
    case ADD_TASK: {
      let index = state.findIndex(x => x.get('template_id') === action.template_id);
      let mod = state;
      if (index > -1 && action.template_id) {
        mod = state.delete(index);
      }
      return mod.push(Map({
        template_id: action.template_id,
        id: action.id,
        summ: action.summ,
        desc: action.desc,
        date: action.date,
        done: action.done
      }));
    }

    /** Remove a task from the array of tasks. */
    case REMOVE_TASK: {
      return state.filterNot(x => x.get('id') === action.id);
    }

    /** Remove tasks corresponding to a task template, if the template is being removed. */
    case REMOVE_TASK_TEMPLATE: {
      return state.filterNot(x => x.get('template_id') === action.id);
    }

    /** Default case. */
    default:
      return state;
  }
}

function taskTemplates(state = List([newTaskTemplate]), action) {
  switch (action.type) {
    case UPDATE_TASK_TEMPLATE_SUMMARY: return updateValue(state, action.id, 'summ', action.value);
    case UPDATE_TASK_TEMPLATE_DESCRIPTION: return updateValue(state, action.id, 'desc', action.value);
    case UPDATE_TASK_TEMPLATE_N: return updateValue(state, action.id, 'n', action.value);
    case RESET_TASK_TEMPLATE_COUNTER: return updateValue(state, action.id, 'cnt', 0);
    case INCREMENT_TASK_TEMPLATE_COUNTER: return incrementValue(state, action.id, 'cnt');
    case TOGGLE_TASK_TEMPLATE_MONTH: return togglePeriod(state, action.id, 'months', action.value);
    case TOGGLE_TASK_TEMPLATE_WEEK: return togglePeriod(state, action.id, 'weeks', action.value);
    case TOGGLE_TASK_TEMPLATE_DAY: return togglePeriod(state, action.id, 'days', action.value);
    case UPDATE_TASK_TEMPLATE_TIME: return updateValue(state, action.id, 'time', action.value);
    case UPDATE_TASK_TEMPLATE_START: return updateValue(state, action.id, 'start', action.value);
    case UPDATE_TASK_TEMPLATE_END: return updateValue(state, action.id, 'end', action.value);
    case SAVE_TASK_TEMPLATE: {
      if (action.id === 'new') {
        let mod = state.setIn([0, 'id'], _.uniqueId());
        if (!mod.getIn([0, 'template', 'start'])) {
          mod = mod.setIn([0, 'template', 'start'], moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD'));
        }
        if (!mod.getIn([0, 'template', 'end'])) {
          mod = mod.setIn([0, 'template', 'end'], '2999-12-31');
        }
        let copied = mod.setIn([0, 'data'], mod.getIn([0, 'template']));
        let ejected = copied.push(copied.get(0));
        return ejected.set(0, newTaskTemplate);
      } else {
        let index = state.findIndex(el => el.get('id') === action.id);
        return state.setIn([index, 'data'], state.getIn([index, 'template']));
      }
    }
    case DISCARD_TASK_TEMPLATE: {
      let index = state.findIndex(el => el.get('id') === action.id);
      if (index > -1) {
        return state.setIn([index, 'template'], state.getIn([index, 'data']));
      } else {
        return state;
      }
    }
    case REMOVE_TASK_TEMPLATE: {
      if (action.id === 'new') {
        return state.set(0, newTaskTemplate);
      } else {
        let index = state.findIndex(el => el.get('id') === action.id);
        if (index > -1) {
          return state.remove(index);
        } else {
          return state;
        }
      }
    }
    default:
      return state;
  }
}

function events(state = List(), action) {
  switch (action.type) {
    case ADD_EVENT: {
      let index = state.findIndex(x => x.get('template_id') === action.template_id);
      let mod = state;
      if (index > -1 && action.template_id) {
        mod = state.delete(index);
      }
      return mod.push(Map({
        template_id: action.template_id,
        id: action.id,
        summ: action.summ,
        desc: action.desc,
        date: action.date,
        time: action.time
      }));
    }
    case REMOVE_EVENT: {
      return state.filterNot(x => x.get('id') === action.id);
    }
    case REMOVE_EVENT_TEMPLATE: {
      return state.filterNot(x => x.get('template_id') === action.id);
    }
    default:
      return state;
  }
}

function eventTemplates(state = List([newEventTemplate]), action) {
  switch (action.type) {
    case UPDATE_EVENT_TEMPLATE_SUMMARY: return updateValue(state, action.id, 'summ', action.value);
    case UPDATE_EVENT_TEMPLATE_DESCRIPTION: return updateValue(state, action.id, 'desc', action.value);
    case UPDATE_EVENT_TEMPLATE_N: return updateValue(state, action.id, 'n', action.value);
    case RESET_EVENT_TEMPLATE_COUNTER: return updateValue(state, action.id, 'cnt', 0);
    case INCREMENT_EVENT_TEMPLATE_COUNTER: return incrementValue(state, action.id, 'cnt');
    case TOGGLE_EVENT_TEMPLATE_MONTH: return togglePeriod(state, action.id, 'months', action.value);
    case TOGGLE_EVENT_TEMPLATE_WEEK: return togglePeriod(state, action.id, 'weeks', action.value);
    case TOGGLE_EVENT_TEMPLATE_DAY: return togglePeriod(state, action.id, 'days', action.value);
    case UPDATE_EVENT_TEMPLATE_TIME: return updateValue(state, action.id, 'time', action.value);
    case UPDATE_EVENT_TEMPLATE_START: return updateValue(state, action.id, 'start', action.value);
    case UPDATE_EVENT_TEMPLATE_END: return updateValue(state, action.id, 'end', action.value);
    case SAVE_EVENT_TEMPLATE: {
      if (action.id === 'new') {
        let mod = state.setIn([0, 'id'], _.uniqueId());
        if (!mod.getIn([0, 'template', 'start'])) {
          mod = mod.setIn([0, 'template', 'start'], moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD'));
        }
        if (!mod.getIn([0, 'template', 'end'])) {
          mod = mod.setIn([0, 'template', 'end'], '2999-12-31');
        }
        let copied = mod.setIn([0, 'data'], mod.getIn([0, 'template']));
        let ejected = copied.push(copied.get(0));
        return ejected.set(0, newEventTemplate);
      } else {
        let index = state.findIndex(el => el.get('id') === action.id);
        return state.setIn([index, 'data'], state.getIn([index, 'template']));
      }
    }
    case DISCARD_EVENT_TEMPLATE: {
      let index = state.findIndex(el => el.get('id') === action.id);
      if (index > -1) {
        return state.setIn([index, 'template'], state.getIn([index, 'data']));
      } else {
        return state;
      }
    }
    case REMOVE_EVENT_TEMPLATE: {
      if (action.id === 'new') {
        return state.set(0, newEventTemplate);
      } else {
        let index = state.findIndex(el => el.get('id') === action.id);
        if (index > -1) {
          return state.remove(index);
        } else {
          return state;
        }
      }
    }
    default:
      return state;
  }
}

function rules(state = List([newRule]), action) {
  switch (action.type) {
    case UPDATE_RULE_SUMMARY: return updateValue(state, action.id, 'summ', action.value);
    case UPDATE_RULE_DESCRIPTION: return updateValue(state, action.id, 'desc', action.value);
    case SAVE_RULE: {
      if (action.id === 'new') {
        let mod = state.setIn([0, 'id'], _.uniqueId());
        let copied = mod.setIn([0, 'data'], mod.getIn([0, 'template']));
        let ejected = copied.push(copied.get(0));
        return ejected.set(0, newRule);
      } else {
        let index = state.findIndex(el => el.get('id') === action.id);
        return state.setIn([index, 'data'], state.getIn([index, 'template']));
      }
    }
    case DISCARD_RULE: {
      let index = state.findIndex(el => el.get('id') === action.id);
      if (index > -1) {
        return state.setIn([index, 'template'], state.getIn([index, 'data']));
      } else {
        return state;
      }
    }
    case REMOVE_RULE: {
      if (action.id === 'new') {
        return state.set(0, newRule);
      } else {
        let index = state.findIndex(el => el.get('id') === action.id);
        if (index > -1) {
          return state.remove(index);
        } else {
          return state;
        }
      }
    }
    default:
      return state;
  }
}

function workDate(state = moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD'), action) {
  switch (action.type) {
    case INCREMENT_WORK_DATE:
      return moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD');
    default:
      return state;
  }
}

function shouldSave(state = false, action) {
  switch (action.type) {
    case ADD_TASK:
    case SAVE_TASK_TEMPLATE:
    case REMOVE_TASK:
    case REMOVE_TASK_TEMPLATE:
    case TOGGLE_TASK:
    case ADD_EVENT:
    case SAVE_EVENT_TEMPLATE:
    case REMOVE_EVENT:
    case REMOVE_EVENT_TEMPLATE:
    case SAVE_RULE:
    case INCREMENT_WORK_DATE:
      return true;
    case UNSET_SHOULD_SAVE:
    default:
      return false;
  }
}

const ops = combineReducers({
  taskVisibilityFilter,
  eventVisibilityFilter,
  tasks,
  taskTemplates,
  events,
  eventTemplates,
  rules,
  workDate,
  shouldSave
});

export default ops;