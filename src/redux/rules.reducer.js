import {List} from 'immutable';
import _ from 'lodash';
import {
	ADD_RULE,
	DISCARD_RULE,
	REMOVE_RULE,
	SAVE_RULE,
	UPDATE_RULE_DESCRIPTION,
	UPDATE_RULE_SUMMARY,
} from './rules.actions.js';
import {updateValue} from './helperFunctions';
import {getRule} from '../utils/objects.js';

export function rules(state = List(), action) {
  switch (action.type) {
    case UPDATE_RULE_SUMMARY: return updateValue(state, action.id, 'summ', action.value);
    case UPDATE_RULE_DESCRIPTION: return updateValue(state, action.id, 'desc', action.value);
    case ADD_RULE: return state.push(getRule(_.uniqueId(), action.summ, action.desc));
    case SAVE_RULE: {
      let index = state.findIndex(x => x.get('id') === action.id);
      if (index > -1 && !state.getIn([index, 'templateID'])) {
        return state.setIn([index, 'data'], state.getIn([index, 'template']));
      } else {
        return state;
      }
    }
    case DISCARD_RULE: {
      let index = state.findIndex(x => x.get('id') === action.id);
      if (index > -1) {
        return state.setIn([index, 'template'], state.getIn([index, 'data']));
      } else {
        return state;
      }
    }
    case REMOVE_RULE: {
      return state.filterNot(x => x.get('id') === action.id);
    }
    default:
      return state;
  }
}

export default rules;