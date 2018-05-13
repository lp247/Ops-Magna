import {TOGGLE_EVENT_DISPLAY} from '../actions/showEventTemplates.actions';

function showEventTemplates(state = false, action) {
  switch (action.type) {
    case TOGGLE_EVENT_DISPLAY:
      return !state;
    default:
      return state;
  }
}

export default showEventTemplates;