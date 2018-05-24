import {
	REMOVE_TASK,
  REMOVE_TASK_TEMPLATE,
	TOGGLE_TASK_DONE,
  SAVE_TASK,
  SAVE_TASK_TEMPLATE,
} from '../actions/tasks.actions';
import {
	REMOVE_EVENT,
  REMOVE_EVENT_TEMPLATE,
  SAVE_EVENT,
  SAVE_EVENT_TEMPLATE,
} from '../actions/events.actions';
import {
  REMOVE_REMINDER,
  SAVE_REMINDER
} from '../actions/reminders.actions';
import {UNSET_SHOULD_SAVE} from '../actions/shouldSave.actions';
import {SELECT_LANGUAGE} from '../actions/lang.actions';

function shouldSave(state = false, action) {
  switch (action.type) {
    case REMOVE_EVENT:
		case REMOVE_EVENT_TEMPLATE:
    case REMOVE_REMINDER:
    case REMOVE_TASK:
    case REMOVE_TASK_TEMPLATE:
    case SAVE_EVENT:
    case SAVE_EVENT_TEMPLATE:
    case SAVE_REMINDER:
    case SAVE_TASK:
    case SAVE_TASK_TEMPLATE:
    case TOGGLE_TASK_DONE:
    case SELECT_LANGUAGE:
      return true;
    case UNSET_SHOULD_SAVE:
    default:
      return false;
  }
}

export default shouldSave;