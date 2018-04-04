export const DISCARD_TASK_TEMPLATE = 'DISCARD_TASK_TEMPLATE';
export const INCREMENT_TASK_TEMPLATE_COUNTER = 'INCREMENT_TASK_TEMPLATE_COUNTER';
export const REMOVE_TASK_TEMPLATE = 'REMOVE_TASK_TEMPLATE';
export const RESET_TASK_TEMPLATE_COUNTER = 'RESET_TASK_TEMPLATE_COUNTER';
export const SAVE_TASK_TEMPLATE = 'SAVE_TASK_TEMPLATE';
export const TOGGLE_TASK_TEMPLATE_DAY = 'TOGGLE_TASK_TEMPLATE_DAY';
export const TOGGLE_TASK_TEMPLATE_MONTH = 'TOGGLE_TASK_TEMPLATE_MONTH';
export const TOGGLE_TASK_TEMPLATE_WEEK = 'TOGGLE_TASK_TEMPLATE_WEEK';
export const UPDATE_TASK_TEMPLATE_DESCRIPTION = 'UPDATE_TASK_TEMPLATE_DESCRIPTION';
export const UPDATE_TASK_TEMPLATE_END = 'UPDATE_TASK_TEMPLATE_END';
export const UPDATE_TASK_TEMPLATE_N = 'UPDATE_TASK_TEMPLATE_N';
export const UPDATE_TASK_TEMPLATE_START = 'UPDATE_TASK_TEMPLATE_START';
export const UPDATE_TASK_TEMPLATE_SUMMARY = 'UPDATE_TASK_TEMPLATE_SUMMARY';
export const UPDATE_TASK_TEMPLATE_TIME = 'UPDATE_TASK_TEMPLATE_TIME';

export function discardTaskTemplate(id) {
	return {type: DISCARD_TASK_TEMPLATE, id};
}

export function incrementTaskTemplateCounter(id) {
	return {type: INCREMENT_TASK_TEMPLATE_COUNTER, id};
}

export function removeTaskTemplate(id) {
	return {type: REMOVE_TASK_TEMPLATE, id};
}

export function resetTaskTemplateCounter(id) {
	return {type: RESET_TASK_TEMPLATE_COUNTER, id};
}

export function saveTaskTemplate(id) {
  return {type: SAVE_TASK_TEMPLATE, id};
}

export function toggleTaskTemplateDay(id, value) {
	return {type: TOGGLE_TASK_TEMPLATE_DAY, id, value};
}

export function toggleTaskTemplateMonth(id, value) {
	return {type: TOGGLE_TASK_TEMPLATE_MONTH, id, value};
}

export function toggleTaskTemplateWeek(id, value) {
	return {type: TOGGLE_TASK_TEMPLATE_WEEK, id, value};
}

export function updateTaskTemplateDescription(id, value) {
	return {type: UPDATE_TASK_TEMPLATE_DESCRIPTION, id, value};
}

export function updateTaskTemplateEnd(id, value) {
	return {type: UPDATE_TASK_TEMPLATE_END, id, value};
}

export function updateTaskTemplateN(id, value) {
	return {type: UPDATE_TASK_TEMPLATE_N, id, value};
}

export function updateTaskTemplateStart(id, value) {
	return {type: UPDATE_TASK_TEMPLATE_START, id, value};
}

export function updateTaskTemplateSummary(id, value) {
  return {type: UPDATE_TASK_TEMPLATE_SUMMARY, id, value};
}

export function updateTaskTemplateTime(id, value) {
  return {type: UPDATE_TASK_TEMPLATE_TIME, id, value};
}