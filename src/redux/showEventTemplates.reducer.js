import {TOGGLE_EVENT_DISPLAY} from './showEventTemplates.actions.js';

function showEventTemplates(state = false, action) {
  switch (action.type) {
    case TOGGLE_EVENT_DISPLAY:
      return !state;
    default:
      return state;
  }
}

export default showEventTemplates;