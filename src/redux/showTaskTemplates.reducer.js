import {TOGGLE_TASK_DISPLAY} from './showTaskTemplates.actions.js';

function showTaskTemplates(state = false, action) {
  switch (action.type) {
    case TOGGLE_TASK_DISPLAY:
      return !state;
    default:
      return state;
  }
}

export default showTaskTemplates;