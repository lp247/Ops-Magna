import {UPDATE_FRT} from './fastRuleText.actions.js';
import {ADD_RULE} from './rules.actions.js';

function fastRuleText(state = '', action) {
  switch (action.type) {
    case UPDATE_FRT: return action.text;
    case ADD_RULE: return '';
    default: return state;
  }
}

export default fastRuleText;