export const ADD_RULE = 'ADD_RULE';
export const DISCARD_RULE = 'DISCARD_RULE';
export const REMOVE_RULE = 'REMOVE_RULE';
export const SAVE_RULE = 'SAVE_RULE';
export const UPDATE_RULE_DESCRIPTION = 'UPDATE_RULE_DESCRIPTION';
export const UPDATE_RULE_SUMMARY = 'UPDATE_RULE_SUMMARY';

export function addRule(summ, desc) {
	return {type: ADD_RULE, summ, desc};
}

export function discardRule(id) {
  return {type: DISCARD_RULE, id};
}

export function removeRule(id) {
  return {type: REMOVE_RULE, id};
}

export function saveRule(id) {
	return {type: SAVE_RULE, id};
}

export function updateRuleDescription(id, value) {
	return {type: UPDATE_RULE_DESCRIPTION, id, value};
}

export function updateRuleSummary(id, value) {
	return {type: UPDATE_RULE_SUMMARY, id, value};
}