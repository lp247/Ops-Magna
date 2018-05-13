import {Map, List} from 'immutable';
import {
	DISCARD_RULE,
	REMOVE_RULE,
	SAVE_RULE,
	UPDATE_RULE_DESCRIPTION,
	UPDATE_RULE_SUMMARY
} from '../actions/rules.actions';
import {
  discardItem,
  removeItem,
  saveRuleChanges,
  updateItemDescription,
  updateItemSummary
} from './ReducerHelperFunctions';
import {getRule} from '../../utils/objects';

export function rules(
  state = Map({
    items: List([getRule('new')])
  }),
  action
) {
  switch (action.type) {
    case DISCARD_RULE: return discardItem(state, action.id);
    case REMOVE_RULE: return removeItem(state, action.id);
    case SAVE_RULE: return saveRuleChanges(state, action.id, action.idGenerator);
    case UPDATE_RULE_DESCRIPTION: return updateItemDescription(state, action.id, action.value);
    case UPDATE_RULE_SUMMARY: return updateItemSummary(state, action.id, action.value);
    default: return state;
  }
}

export default rules;