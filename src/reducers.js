import {combineReducers} from 'redux';
import {List, Map} from 'immutable';
import {
  ADD_TASK,
  ADD_EVENT,
  REMOVE_TASK,
  REMOVE_EVENT,
  TOGGLE_TASK,
  TOGGLE_TASK_VISIBILITY_FILTER,
  TOGGLE_EVENT_VISIBILITY_FILTER,
  VisibilityFilters,
  UPDATE_FTT,
  UPDATE_FET,
  UPDATE_TASK_KEY,
  UPDATE_EVENT_KEY,
  CLR_FORMDATA,
  EDIT_TASK,
  EDIT_EVENT,
  NEW_TASK,
  NEW_EVENT
} from './actions';
import { emptyTask, emptyEvent } from './objects';
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

function tasks(state = List(), action) {
  switch (action.type) {
    case ADD_TASK:
      return state.push(action.task);
    case REMOVE_TASK:
      let remove_index = state.findIndex(el => el.get('data').get('id') === action.id);
      if (remove_index === -1) {
        return state;
      } else {
        return state.remove(remove_index);
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
      return state.setIn([update_index, action.key], action.value);
    default:
      return state;
  }
}

function events(state = List(), action) {
  switch (action.type) {
    case ADD_EVENT:
      return state.push(action.event);
    case REMOVE_EVENT:
      let remove_index = state.findIndex(el => el.get('data').get('id') === action.id);
      if (remove_index === -1) {
        return state;
      } else {
        return state.remove(remove_index);
      }
    case UPDATE_EVENT_KEY:
      let update_index = state.findIndex(el => el.get('data').get('id') === action.id);
      return state.setIn([update_index, action.key], action.value);
    default:
      return state;
  }
}

function fastTaskText(state = '', action) {
  switch (action.type) {
    case UPDATE_FTT:
      return action.text;
    case ADD_TASK:
      return '';
    default:
      return state;
  }
}

function fastEventText(state = '', action) {
  switch (action.type) {
    case UPDATE_FET:
      return action.text;
    case ADD_EVENT:
      return '';
    default:
      return state;
  }
}

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
  events,
  fastTaskText,
  fastEventText
});

export default ops;