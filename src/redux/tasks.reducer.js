import {List} from 'immutable';
import _ from 'lodash';
import {
	ADD_TASK,
	DISCARD_TASK,
	REMOVE_TASK,
	SAVE_TASK,
	TOGGLE_TASK_DONE,
	UPDATE_TASK_DATE,
	UPDATE_TASK_DESCRIPTION,
	UPDATE_TASK_SUMMARY,
} from './tasks.actions.js';
import {updateValue} from './helperFunctions';
import {REMOVE_TASK_TEMPLATE} from './taskTemplates.actions.js';
import { getTask } from '../utils/objects.js';

/**
 * Redux reducer for the tasks.
 * 
 * @param {List.<Map>} state List of tasks.
 * @param {Object} action Dispatched action.
 */
export default function tasks(state = List(), action) {
  switch (action.type) {
    case UPDATE_TASK_SUMMARY: return updateValue(state, action.id, 'summ', action.value);
    case UPDATE_TASK_DESCRIPTION: return updateValue(state, action.id, 'desc', action.value);
    case UPDATE_TASK_DATE: return updateValue(state, action.id, 'date', action.value);

    /** Toggle the 'done' property of a task. */
    case TOGGLE_TASK_DONE: {
      let index = state.findIndex(el => el.get('id') === action.id);
      if (index > -1) {
        return state.setIn([index, 'done'], !state.getIn([index, 'done']));
      } else {
        return state;
      }
    }

    /** Add a task to the array of tasks. */
    case ADD_TASK: {
      let index = state.findIndex(x => x.get('templateID') === action.templateID);
      let mod = state;
      if (index > -1 && action.templateID) {
        mod = state.delete(index);
      }
      return mod.push(getTask(
        action.templateID,
        _.uniqueId(),
        action.summ,
        action.desc,
        action.date,
        action.time,
        false
      ));
    }

    case SAVE_TASK: {
      let index = state.findIndex(x => x.get('id') === action.id);
      if (index > -1 && !state.getIn([index, 'templateID'])) {
        return state.setIn([index, 'data'], state.getIn([index, 'template']));
      } else {
        return state;
      }
    }
    case DISCARD_TASK: {
      let index = state.findIndex(x => x.get('id') === action.id);
      if (index > -1) {
        return state.setIn([index, 'template'], state.getIn([index, 'data']));
      } else {
        return state;
      }
    }

    /** Remove a task from the array of tasks. */
    case REMOVE_TASK: {
      let index = state.findIndex(x => x.get('id') === action.id);
      if (index > -1 && !state.getIn([index, 'templateID'])) {
        return state.delete(index);
      } else {
        return state;
      }
    }

    /** Remove tasks corresponding to a task template, if the template is being removed. */
    case REMOVE_TASK_TEMPLATE: {
      return state.filterNot(x => x.get('templateID') === action.id);
    }

    /** Default case. */
    default:
      return state;
  }
}