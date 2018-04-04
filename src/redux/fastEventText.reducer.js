import {UPDATE_FET} from './fastEventText.actions.js';
import {ADD_EVENT} from './events.actions.js';

function fastEventText(state = '', action) {
  switch (action.type) {
    case UPDATE_FET: return action.text;
    case ADD_EVENT: return '';
    default: return state;
  }
}

export default fastEventText;