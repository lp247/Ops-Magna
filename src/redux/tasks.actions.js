export const ADD_TASK = 'ADD_TASK';
export const DISCARD_TASK = 'DISCARD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const SAVE_TASK = 'SAVE_TASK';
export const TOGGLE_TASK_DONE = 'TOGGLE_TASK_DONE';
export const UPDATE_TASK_DATE = 'UPDATE_TASK_DATE';
export const UPDATE_TASK_DESCRIPTION = 'UPDATE_TASK_DESCRIPTION';
export const UPDATE_TASK_SUMMARY = 'UPDATE_TASK_SUMMARY';
export const UPDATE_TASK_TIME = 'UPDATE_TASK_TIME';

export function addTask(templateID, summ, desc, date, time) {
  return {type: ADD_TASK, templateID, summ, desc, date, time};
}

export function discardTask(id) {
	return {type: DISCARD_TASK, id};
}

export function removeTask(id) {
  return {type: REMOVE_TASK, id};
}

export function saveTask(id) {
	return {type: SAVE_TASK, id};
}

export function toggleTaskDone(id) {
	return {type: TOGGLE_TASK_DONE, id};
}

export function updateTaskDate(id, value) {
	return {type: UPDATE_TASK_DATE, id, value};
}

export function updateTaskDescription(id, value) {
	return {type: UPDATE_TASK_DESCRIPTION, id, value};
}

export function updateTaskSummary(id, value) {
	return {type: UPDATE_TASK_SUMMARY, id, value};
}

export function updateTaskTime(id, value) {
	return {type: UPDATE_TASK_TIME, id, value};
}