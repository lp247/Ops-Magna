import {combineReducers} from 'redux-immutable';
import {List} from 'immutable';
import moment from 'moment';
import _ from 'lodash';
import {
  EJECT_NEW_TASK,
  EJECT_NEW_EVENT,
  REMOVE_TASK,
  REMOVE_EVENT,
  TOGGLE_TASK,
  TOGGLE_TASK_VISIBILITY_FILTER,
  TOGGLE_EVENT_VISIBILITY_FILTER,
  VisibilityFilters,
  UPDATE_TASK_KEY,
  UPDATE_EVENT_KEY,
  UPDATE_TASK_BACKUP,
  RESET_TASK_DATA,
  RESET_EVENT_DATA,
  UPDATE_EVENT_BACKUP,
  INCREMENT_WORK_DATE,
  EJECT_NEW_RULE,
  REMOVE_RULE,
  UPDATE_RULE_KEY,
  RESET_RULE_DATA,
  UPDATE_RULE_BACKUP
} from './actions';
import { newTask, newEvent, newRule } from '../utils/objects';
const {SHOW_ALL, SHOW_TODAY} = VisibilityFilters;

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

function tasks(state = List([newTask]), action) {
  switch (action.type) {
    case EJECT_NEW_TASK:
      let miscadd = state.setIn([0, 'data', 'id'], _.uniqueId());
      if (!miscadd.getIn([0, 'data', 'start'])) {
        miscadd = miscadd.setIn([0, 'data', 'start'], moment().subtract(5, 'hours').format('YYYY-MM-DD'));
      }
      if (!miscadd.getIn([0, 'data', 'end'])) {
        miscadd = miscadd.setIn([0, 'data', 'end'], '2999-12-31');
      }
      miscadd = miscadd.setIn([0, 'data', 'lastExec', 'date'], miscadd.getIn([0, 'data', 'start']));
      let backupAdded = miscadd.setIn([0, 'backup'], miscadd.getIn([0, 'data']));
      let ejected = backupAdded.push(backupAdded.get(0));
      let cleared = ejected.set(0, newTask);
      return cleared;
    case REMOVE_TASK:
      if (action.id === 'new') {
        return state.set(0, newTask);
      } else {
        let remove_index = state.findIndex(el => el.getIn(['data', 'id']) === action.id);
        if (remove_index === -1) {
          return state;
        } else {
          return state.remove(remove_index);
        }
      }
    case TOGGLE_TASK:
      let taskIndex = state.findIndex(el => el.getIn(['data', 'id']) === action.id);
      if (taskIndex > -1) {
        return state.setIn([taskIndex, 'data', 'lastExec', 'done'], !state.getIn([taskIndex, 'data', 'lastExec', 'done']));
      } else {
        return state;
      }
    case UPDATE_TASK_KEY:
      let update_index = state.findIndex(el => el.getIn(['data', 'id']) === action.id);
      let mod = state.setIn([update_index, 'data', action.key], action.value);
      // If the start changes, reset 'lastExec', because otherwise it can remain in past, where it generates a ghost
      // task in the list of not completed tasks, or it can remain at today, where it acts like a current task and
      // therefore is not shown in the list of incompleted tasks.
      if (action.key === 'start') {
        mod = mod.setIn(['data', 'lastExec'], Map({date: action.value, done: false}));
      }
      return mod;
    case RESET_TASK_DATA:
      let data_index = state.findIndex(el => el.getIn(['data', 'id']) === action.id);
      return state.setIn([data_index, 'data'], state.getIn([data_index, 'backup']));
    case UPDATE_TASK_BACKUP:
      let backup_index = state.findIndex(el => el.getIn(['data', 'id']) === action.id);
      return state.setIn([backup_index, 'backup'], state.getIn([backup_index, 'data']));
    default:
      return state;
  }
}

function events(state = List([newEvent]), action) {
  switch (action.type) {
    case EJECT_NEW_EVENT:
      let miscadd = state.setIn([0, 'data', 'id'], _.uniqueId());
      if (!miscadd.getIn([0, 'data', 'start'])) {
        miscadd = miscadd.setIn([0, 'data', 'start'], moment().subtract(5, 'hours').format('YYYY-MM-DD'));
      }
      if (!miscadd.getIn([0, 'data', 'end'])) {
        miscadd = miscadd.setIn([0, 'data', 'end'], '2999-12-31');
      }
      let backupAdded = miscadd.setIn([0, 'backup'], miscadd.getIn([0, 'data']));
      let ejected = backupAdded.push(backupAdded.get(0));
      let cleared = ejected.set(0, newEvent);
      return cleared;
    case REMOVE_EVENT:
      if (action.id === 'new') {
        return state.set(0, newEvent);
      } else {
        let remove_index = state.findIndex(el => el.getIn(['data', 'id']) === action.id);
        if (remove_index === -1) {
          return state;
        } else {
          return state.remove(remove_index);
        }
      }
    case UPDATE_EVENT_KEY:
      let update_index = state.findIndex(el => el.getIn(['data', 'id']) === action.id);
      return state.setIn([update_index, 'data', action.key], action.value);
    case RESET_EVENT_DATA:
      let data_index = state.findIndex(el => el.getIn(['data', 'id']) === action.id);
      return state.setIn([data_index, 'data'], state.getIn([data_index, 'backup']));
    case UPDATE_EVENT_BACKUP:
      let backup_index = state.findIndex(el => el.getIn(['data', 'id']) === action.id);
      return state.setIn([backup_index, 'backup'], state.getIn([backup_index, 'data']));
    default:
      return state;
  }
}

function rules(state = List([newRule]), action) {
  switch (action.type) {
    case EJECT_NEW_RULE:
      let miscadd = state.setIn([0, 'data', 'id'], _.uniqueId());
      let backupAdded = miscadd.setIn([0, 'backup'], miscadd.getIn([0, 'data']));
      let ejected = backupAdded.push(backupAdded.get(0));
      let cleared = ejected.set(0, newRule);
      return cleared;
    case REMOVE_RULE:
      if (action.id === 'new') {
        return state.set(0, newRule);
      } else {
        let remove_index = state.findIndex(el => el.getIn(['data', 'id']) === action.id);
        if (remove_index === -1) {
          return state;
        } else {
          return state.remove(remove_index);
        }
      }
    case UPDATE_RULE_KEY:
      let update_index = state.findIndex(el => el.getIn(['data', 'id']) === action.id);
      return state.setIn([update_index, 'data', action.key], action.value);
    case RESET_RULE_DATA:
      let data_index = state.findIndex(el => el.getIn(['data', 'id']) === action.id);
      return state.setIn([data_index, 'data'], state.getIn([data_index, 'backup']));
    case UPDATE_RULE_BACKUP:
      let backup_index = state.findIndex(el => el.getIn(['data', 'id']) === action.id);
      return state.setIn([backup_index, 'backup'], state.getIn([backup_index, 'data']));
    default:
      return state;
  }
}

function workDate(state = moment().format('YYYY-MM-DD'), action) {
  switch (action.type) {
    case INCREMENT_WORK_DATE:
      return moment(state).add(1, 'day').format('YYYY-MM-DD');
    default:
      return state;
  }
}

const ops = combineReducers({
  taskVisibilityFilter,
  eventVisibilityFilter,
  tasks,
  events,
  rules,
  workDate
});

export default ops;