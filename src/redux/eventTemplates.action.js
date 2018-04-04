export const DISCARD_EVENT_TEMPLATE = 'DISCARD_EVENT_TEMPLATE';
export const INCREMENT_EVENT_TEMPLATE_COUNTER = 'INCREMENT_EVENT_TEMPLATE_COUNTER';
export const REMOVE_EVENT_TEMPLATE = 'REMOVE_EVENT_TEMPLATE';
export const RESET_EVENT_TEMPLATE_COUNTER = 'RESET_EVENT_TEMPLATE_COUNTER';
export const SAVE_EVENT_TEMPLATE = 'SAVE_EVENT_TEMPLATE';
export const TOGGLE_EVENT_TEMPLATE_DAY = 'TOGGLE_EVENT_TEMPLATE_DAY';
export const TOGGLE_EVENT_TEMPLATE_MONTH = 'TOGGLE_EVENT_TEMPLATE_MONTH';
export const TOGGLE_EVENT_TEMPLATE_WEEK = 'TOGGLE_EVENT_TEMPLATE_WEEK';
export const UPDATE_EVENT_TEMPLATE_DESCRIPTION = 'UPDATE_EVENT_TEMPLATE_DESCRIPTION';
export const UPDATE_EVENT_TEMPLATE_END = 'UPDATE_EVENT_TEMPLATE_END';
export const UPDATE_EVENT_TEMPLATE_N = 'UPDATE_EVENT_TEMPLATE_N';
export const UPDATE_EVENT_TEMPLATE_START = 'UPDATE_EVENT_TEMPLATE_START';
export const UPDATE_EVENT_TEMPLATE_SUMMARY = 'UPDATE_EVENT_TEMPLATE_SUMMARY';
export const UPDATE_EVENT_TEMPLATE_TIME = 'UPDATE_EVENT_TEMPLATE_TIME';

export function discardEventTemplate(id) {
  return {type: DISCARD_EVENT_TEMPLATE, id};
}

export function incrementEventTemplateCounter(id) {
	return {type: INCREMENT_EVENT_TEMPLATE_COUNTER, id};
}

export function removeEventTemplate(id) {
  return {type: REMOVE_EVENT_TEMPLATE, id};
}

export function resetEventTemplateCounter(id) {
	return {type: RESET_EVENT_TEMPLATE_COUNTER, id};
}

export function saveEventTemplate(id) {
  return {type: SAVE_EVENT_TEMPLATE, id};
}

export function toggleEventTemplateDay(id, value) {
	return {type: TOGGLE_EVENT_TEMPLATE_DAY, id, value};
}

export function toggleEventTemplateMonth(id, value) {
	return {type: TOGGLE_EVENT_TEMPLATE_MONTH, id, value};
}

export function toggleEventTemplateWeek(id, value) {
	return {type: TOGGLE_EVENT_TEMPLATE_WEEK, id, value};
}

export function updateEventTemplateDescription(id, value) {
	return {type: UPDATE_EVENT_TEMPLATE_DESCRIPTION, id, value};
}

export function updateEventTemplateEnd(id, value) {
	return {type: UPDATE_EVENT_TEMPLATE_END, id, value};
}

export function updateEventTemplateN(id, value) {
	return {type: UPDATE_EVENT_TEMPLATE_N, id, value};
}

export function updateEventTemplateStart(id, value) {
	return {type: UPDATE_EVENT_TEMPLATE_START, id, value};
}

export function updateEventTemplateSummary(id, value) {
  return {type: UPDATE_EVENT_TEMPLATE_SUMMARY, id, value};
}

export function updateEventTemplateTime(id, value) {
  return {type: UPDATE_EVENT_TEMPLATE_TIME, id, value};
}