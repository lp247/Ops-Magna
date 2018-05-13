import _ from 'lodash';
import moment from 'moment';

import {DAY_CHANGE_HOUR} from '../../utils/constants';

export const DISCARD_TASK = 'DISCARD_TASK';
export const DISCARD_TASK_TEMPLATE = 'DISCARD_TASK_TEMPLATE';
export const INCREMENT_TASK_TEMPLATE_COUNTER = 'INCREMENT_TASK_TEMPLATE_COUNTER';
export const REMOVE_TASK = 'REMOVE_TASK';
export const REMOVE_TASK_TEMPLATE = 'REMOVE_TASK_TEMPLATE';
export const RESET_TASK_TEMPLATE_COUNTER = 'RESET_TASK_TEMPLATE_COUNTER';
export const SAVE_TASK = 'SAVE_TASK';
export const SAVE_TASK_TEMPLATE = 'SAVE_TASK_TEMPLATE';
export const TOGGLE_TASK_DONE = 'TOGGLE_TASK_DONE';
export const TOGGLE_TASK_TEMPLATE_DAY = 'TOGGLE_TASK_TEMPLATE_DAY';
export const TOGGLE_TASK_TEMPLATE_MONTH = 'TOGGLE_TASK_TEMPLATE_MONTH';
export const TOGGLE_TASK_TEMPLATE_WEEK = 'TOGGLE_TASK_TEMPLATE_WEEK';
export const UPDATE_TASK_DATE = 'UPDATE_TASK_DATE';
export const UPDATE_TASK_DESCRIPTION = 'UPDATE_TASK_DESCRIPTION';
export const UPDATE_TASK_TEMPLATE_DESCRIPTION = 'UPDATE_TASK_TEMPLATE_DESCRIPTION';
export const UPDATE_TASK_TEMPLATE_END = 'UPDATE_TASK_TEMPLATE_END';
export const UPDATE_TASK_TEMPLATE_N = 'UPDATE_TASK_TEMPLATE_N';
export const UPDATE_TASK_SUMMARY = 'UPDATE_TASK_SUMMARY';
export const UPDATE_TASK_TEMPLATE_SUMMARY = 'UPDATE_TASK_TEMPLATE_SUMMARY';
export const UPDATE_TASK_TEMPLATE_START = 'UPDATE_TASK_TEMPLATE_START';
export const UPDATE_TASK_TIME = 'UPDATE_TASK_TIME';
export const UPDATE_TASK_TEMPLATE_TIME = 'UPDATE_TASK_TEMPLATE_TIME';

export function discardTask(id) {
	return {type: DISCARD_TASK, id};
}

export function discardTaskTemplate(id) {
	return {type: DISCARD_TASK_TEMPLATE, id};
}

export function incrementTaskTemplateCounter(id) {
	return {type: INCREMENT_TASK_TEMPLATE_COUNTER, id};
}

export function removeTask(id) {
  return {type: REMOVE_TASK, id};
}

export function removeTaskTemplate(id) {
	return {type: REMOVE_TASK_TEMPLATE, id};
}

export function resetTaskTemplateCounter(id) {
	return {type: RESET_TASK_TEMPLATE_COUNTER, id};
}

export function saveTask(id, idGenerator = _.uniqueId, newtid='') {
	return {type: SAVE_TASK, id, idGenerator, newtid};
}

export function saveTaskTemplate(id, today = moment().subtract(DAY_CHANGE_HOUR, 'hours'), idGenerator = _.uniqueId) {
  return {type: SAVE_TASK_TEMPLATE, id, today, idGenerator};
}

export function toggleTaskDone(id) {
	return {type: TOGGLE_TASK_DONE, id};
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

export function updateTaskDate(id, value) {
	return {type: UPDATE_TASK_DATE, id, value};
}

export function updateTaskDescription(id, value) {
	return {type: UPDATE_TASK_DESCRIPTION, id, value};
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

export function updateTaskSummary(id, value) {
	return {type: UPDATE_TASK_SUMMARY, id, value};
}

export function updateTaskTemplateSummary(id, value) {
  return {type: UPDATE_TASK_TEMPLATE_SUMMARY, id, value};
}

export function updateTaskTemplateStart(id, value) {
	return {type: UPDATE_TASK_TEMPLATE_START, id, value};
}

export function updateTaskTime(id, value) {
	return {type: UPDATE_TASK_TIME, id, value};
}

export function updateTaskTemplateTime(id, value) {
  return {type: UPDATE_TASK_TEMPLATE_TIME, id, value};
}