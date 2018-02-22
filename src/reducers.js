import {combineReducers} from 'redux';
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
  // UPDATE_FTT,
  // UPDATE_FET,
  UPDATE_TASK_KEY,
  UPDATE_EVENT_KEY,
  UPDATE_TASK_BACKUP,
  RESET_TASK_DATA,
  RESET_EVENT_DATA,
  UPDATE_EVENT_BACKUP,
  // CLR_FORMDATA,
  // EDIT_TASK,
  // EDIT_EVENT,
  // NEW_TASK,
  // NEW_EVENT
} from './actions';
import { newTask, newEvent } from './objects';
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
      if (!miscadd.get(0).get('data').get('start')) {
        miscadd = miscadd.setIn([0, 'data', 'start'], moment().subtract(5, 'hours').format('YYYY-MM-DD'));
      }
      if (!miscadd.get(0).get('data').get('end')) {
        miscadd = miscadd.setIn([0, 'data', 'end'], '2999-12-31');
      }
      let backupAdded = miscadd.setIn([0, 'backup'], miscadd.get(0).get('data'));
      let ejected = backupAdded.push(backupAdded.get(0));
      let cleared = ejected.set(0, newTask);
      // dispatch(updateTaskKey('new', 'start', moment().subtract(5, 'hours').format('YYYY-MM-DD')));
      //       dispatch(updateTaskKey('new', 'end', '2999-12-31'));
      return cleared;
    case REMOVE_TASK:
      if (action.id === 'new') {
        return state.set(0, newTask);
      } else {
        let remove_index = state.findIndex(el => el.get('data').get('id') === action.id);
        if (remove_index === -1) {
          return state;
        } else {
          return state.remove(remove_index);
        }
      }
    case TOGGLE_TASK:
      let taskIndex = state.findIndex(el => el.get('data').get('id') === action.id);
      if (taskIndex > -1) {
        let dateIndex = state.get(taskIndex).get('data').get('doneAt').indexOf(action.date);
        if (dateIndex === -1) {
          return state.updateIn([taskIndex, 'data', 'doneAt'], list => list.push(action.date));
        } else {
          return state.updateIn([taskIndex, 'data', 'doneAt'], list => list.delete(dateIndex));
        }
      } else {
        return state;
      }
    case UPDATE_TASK_KEY:
      let update_index = state.findIndex(el => el.get('data').get('id') === action.id);
      return state.setIn([update_index, 'data', action.key], action.value);
    case RESET_TASK_DATA:
      let data_index = state.findIndex(el => el.get('data').get('id') === action.id);
      return state.setIn([data_index, 'data'], state.get(data_index).get('backup'));
    case UPDATE_TASK_BACKUP:
      let backup_index = state.findIndex(el => el.get('data').get('id') === action.id);
      return state.setIn([backup_index, 'backup'], state.get(backup_index).get('data'));
    default:
      return state;
  }
}

function events(state = List([newEvent]), action) {
  switch (action.type) {
    case EJECT_NEW_EVENT:
      let miscadd = state.setIn([0, 'data', 'id'], _.uniqueId());
      if (!miscadd.get(0).get('data').get('start')) {
        miscadd = miscadd.setIn([0, 'data', 'start'], moment().subtract(5, 'hours').format('YYYY-MM-DD'));
      }
      if (!miscadd.get(0).get('data').get('end')) {
        miscadd = miscadd.setIn([0, 'data', 'end'], '2999-12-31');
      }
      let backupAdded = miscadd.setIn([0, 'backup'], miscadd.get(0).get('data'));
      let ejected = backupAdded.push(backupAdded.get(0));
      let cleared = ejected.set(0, newEvent);
      return cleared;
    case REMOVE_EVENT:
      if (action.id === 'new') {
        return state.set(0, newEvent);
      } else {
        let remove_index = state.findIndex(el => el.get('data').get('id') === action.id);
        if (remove_index === -1) {
          return state;
        } else {
          return state.remove(remove_index);
        }
      }
    case UPDATE_EVENT_KEY:
      let update_index = state.findIndex(el => el.get('data').get('id') === action.id);
      return state.setIn([update_index, 'data', action.key], action.value);
    case RESET_EVENT_DATA:
      let data_index = state.findIndex(el => el.get('data').get('id') === action.id);
      return state.setIn([data_index, 'data'], state.get(data_index).get('backup'));
    case UPDATE_EVENT_BACKUP:
      let backup_index = state.findIndex(el => el.get('data').get('id') === action.id);
      return state.setIn([backup_index, 'backup'], state.get(backup_index).get('data'));
    default:
      return state;
  }
}

// function fastTaskText(state = '', action) {
//   switch (action.type) {
//     case UPDATE_FTT:
//       return action.text;
//     case ADD_TASK:
//       return '';
//     default:
//       return state;
//   }
// }

// function fastEventText(state = '', action) {
//   switch (action.type) {
//     case UPDATE_FET:
//       return action.text;
//     case ADD_EVENT:
//       return '';
//     default:
//       return state;
//   }
// }

// function formData(state = emptyTask, action) {
//   switch (action.type) {
//     case UPDATE_FORMDATA_KEY:
//       return state.set(action.key, action.value);
//     case ADD_TASK:
//       return emptyTask;
//     case ADD_EVENT:
//       return emptyEvent;
//     case NEW_TASK:
//       return emptyTask.set('summ', action.text);
//     case NEW_EVENT:
//       return emptyEvent.set('summ', action.text);
//     case CLR_FORMDATA:
//       return emptyTask;
//     case EDIT_TASK:
//       return action.task;
//     case EDIT_EVENT:
//       return action.event;
//     default:
//       return state;
//   }
// }

const ops = combineReducers({
  taskVisibilityFilter,
  eventVisibilityFilter,
  tasks,
  events
});

export default ops;