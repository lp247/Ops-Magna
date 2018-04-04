import {UPDATE_FTT} from './fastTaskText.actions.js';
import {ADD_TASK} from './tasks.actions.js';

function fastTaskText(state = '', action) {
  switch (action.type) {
    case UPDATE_FTT: return action.text;
    case ADD_TASK: return '';
    default: return state;
  }
}

export default fastTaskText;