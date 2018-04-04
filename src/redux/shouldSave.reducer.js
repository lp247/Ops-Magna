import {
	ADD_TASK,
	REMOVE_TASK,
	TOGGLE_TASK_DONE,
  SAVE_TASK
} from './tasks.actions';
import {
	SAVE_TASK_TEMPLATE,
	REMOVE_TASK_TEMPLATE
} from './taskTemplates.actions';
import {
	ADD_EVENT,
	REMOVE_EVENT,
  SAVE_EVENT
} from './events.actions';
import {
	SAVE_EVENT_TEMPLATE,
	REMOVE_EVENT_TEMPLATE
} from './eventTemplates.action';
import {
  ADD_RULE,
  REMOVE_RULE,
  SAVE_RULE
} from './rules.actions';
import {INCREMENT_WORK_DATE} from './workDate.actions';
import {UNSET_SHOULD_SAVE} from './shouldSave.actions.js';

function shouldSave(state = false, action) {
  switch (action.type) {
    case ADD_EVENT:
    case ADD_RULE:
    case ADD_TASK:
    case INCREMENT_WORK_DATE:
    case REMOVE_EVENT:
		case REMOVE_EVENT_TEMPLATE:
    case REMOVE_RULE:
    case REMOVE_TASK:
    case REMOVE_TASK_TEMPLATE:
    case SAVE_EVENT:
    case SAVE_EVENT_TEMPLATE:
    case SAVE_RULE:
    case SAVE_TASK:
    case SAVE_TASK_TEMPLATE:
    case TOGGLE_TASK_DONE:
      return true;
    case UNSET_SHOULD_SAVE:
    default:
      return false;
  }
}

export default shouldSave;