export const UPDATE_TASK_TEMPLATE_SUMMARY = 'UPDATE_TASK_TEMPLATE_SUMMARY';
export const UPDATE_TASK_TEMPLATE_DESCRIPTION = 'UPDATE_TASK_TEMPLATE_DESCRIPTION';
export const UPDATE_TASK_TEMPLATE_N = 'UPDATE_TASK_TEMPLATE_N';
export const RESET_TASK_TEMPLATE_COUNTER = 'RESET_TASK_TEMPLATE_COUNTER';
export const INCREMENT_TASK_TEMPLATE_COUNTER = 'INCREMENT_TASK_TEMPLATE_COUNTER';
export const TOGGLE_TASK_TEMPLATE_MONTH = 'TOGGLE_TASK_TEMPLATE_MONTH';
export const TOGGLE_TASK_TEMPLATE_WEEK = 'TOGGLE_TASK_TEMPLATE_WEEK';
export const TOGGLE_TASK_TEMPLATE_DAY = 'TOGGLE_TASK_TEMPLATE_DAY';
export const UPDATE_TASK_TEMPLATE_TIME = 'UPDATE_TASK_TEMPLATE_TIME';
export const UPDATE_TASK_TEMPLATE_START = 'UPDATE_TASK_TEMPLATE_START';
export const UPDATE_TASK_TEMPLATE_END = 'UPDATE_TASK_TEMPLATE_END';
export const UPDATE_EVENT_TEMPLATE_SUMMARY = 'UPDATE_EVENT_TEMPLATE_SUMMARY';
export const UPDATE_EVENT_TEMPLATE_DESCRIPTION = 'UPDATE_EVENT_TEMPLATE_DESCRIPTION';
export const UPDATE_EVENT_TEMPLATE_N = 'UPDATE_EVENT_TEMPLATE_N';
export const RESET_EVENT_TEMPLATE_COUNTER = 'RESET_EVENT_TEMPLATE_COUNTER';
export const INCREMENT_EVENT_TEMPLATE_COUNTER = 'INCREMENT_EVENT_TEMPLATE_COUNTER';
export const TOGGLE_EVENT_TEMPLATE_MONTH = 'TOGGLE_EVENT_TEMPLATE_MONTH';
export const TOGGLE_EVENT_TEMPLATE_WEEK = 'TOGGLE_EVENT_TEMPLATE_WEEK';
export const TOGGLE_EVENT_TEMPLATE_DAY = 'TOGGLE_EVENT_TEMPLATE_DAY';
export const UPDATE_EVENT_TEMPLATE_TIME = 'UPDATE_EVENT_TEMPLATE_TIME';
export const UPDATE_EVENT_TEMPLATE_START = 'UPDATE_EVENT_TEMPLATE_START';
export const UPDATE_EVENT_TEMPLATE_END = 'UPDATE_EVENT_TEMPLATE_END';
export const UPDATE_RULE_SUMMARY = 'UPDATE_RULE_SUMMARY';
export const UPDATE_RULE_DESCRIPTION = 'UPDATE_RULE_DESCRIPTION';
export const SAVE_TASK_TEMPLATE = 'SAVE_TASK_TEMPLATE';
export const SAVE_EVENT_TEMPLATE = 'SAVE_EVENT_TEMPLATE';
export const SAVE_RULE = 'SAVE_RULE';
export const DISCARD_TASK_TEMPLATE = 'DISCARD_TASK_TEMPLATE';
export const DISCARD_EVENT_TEMPLATE = 'DISCARD_EVENT_TEMPLATE';
export const DISCARD_RULE = 'DISCARD_RULE';
export const REMOVE_TASK = 'REMOVE_TASK';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const REMOVE_TASK_TEMPLATE = 'REMOVE_TASK_TEMPLATE';
export const REMOVE_EVENT_TEMPLATE = 'REMOVE_EVENT_TEMPLATE';
export const REMOVE_RULE = 'REMOVE_RULE';
export const ADD_TASK = 'ADD_TASK';
export const ADD_EVENT = 'ADD_EVENT';

/** Additional: id */
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const TOGGLE_TASK_VISIBILITY_FILTER = 'SET_TASK_VISIBILITY_FILTER';
export const TOGGLE_EVENT_VISIBILITY_FILTER = 'SET_EVENT_VISIBILITY_FILTER';
export const INCREMENT_WORK_DATE = 'INCREMENT_WORK_DATE';
export const UNSET_SHOULD_SAVE = 'UNSET_SHOULD_SAVE';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_TODAY: 'SHOW_TODAY'
}

export function updateTaskTemplateSummary(id, value) {
  return {type: UPDATE_TASK_TEMPLATE_SUMMARY, id, value};
}

export function updateTaskTemplateDescription(id, value) {
  return {type: UPDATE_TASK_TEMPLATE_DESCRIPTION, id, value};
}

export function updateTaskTemplateN(id, value) {
  return {type: UPDATE_TASK_TEMPLATE_N, id, value};
}

export function resetTaskTemplateCounter(id) {
  return {type: RESET_TASK_TEMPLATE_COUNTER, id};
}

export function incrementTaskTemplateCounter(id) {
  return {type: INCREMENT_TASK_TEMPLATE_COUNTER, id};
}

export function toggleTaskTemplateMonth(id, value) {
  return {type: TOGGLE_TASK_TEMPLATE_MONTH, id, value};
}

export function toggleTaskTemplateWeek(id, value) {
  return {type: TOGGLE_TASK_TEMPLATE_WEEK, id, value};
}

export function toggleTaskTemplateDay(id, value) {
  return {type: TOGGLE_TASK_TEMPLATE_DAY, id, value};
}

export function updateTaskTemplateTime(id, value) {
  return {type: UPDATE_TASK_TEMPLATE_TIME, id, value};
}

export function updateTaskTemplateStart(id, value) {
  return {type: UPDATE_TASK_TEMPLATE_START, id, value};
}

export function updateTaskTemplateEnd(id, value) {
  return {type: UPDATE_TASK_TEMPLATE_END, id, value};
}

export function updateEventTemplateSummary(id, value) {
  return {type: UPDATE_EVENT_TEMPLATE_SUMMARY, id, value};
}

export function updateEventTemplateDescription(id, value) {
  return {type: UPDATE_EVENT_TEMPLATE_DESCRIPTION, id, value};
}

export function updateEventTemplateN(id, value) {
  return {type: UPDATE_EVENT_TEMPLATE_N, id, value};
}

export function resetEventTemplateCounter(id) {
  return {type: RESET_EVENT_TEMPLATE_COUNTER, id};
}

export function incrementEventTemplateCounter(id) {
  return {type: INCREMENT_EVENT_TEMPLATE_COUNTER, id};
}

export function toggleEventTemplateMonth(id, value) {
  return {type: TOGGLE_EVENT_TEMPLATE_MONTH, id, value};
}

export function toggleEventTemplateWeek(id, value) {
  return {type: TOGGLE_EVENT_TEMPLATE_WEEK, id, value};
}

export function toggleEventTemplateDay(id, value) {
  return {type: TOGGLE_EVENT_TEMPLATE_DAY, id, value};
}

export function updateEventTemplateTime(id, value) {
  return {type: UPDATE_EVENT_TEMPLATE_TIME, id, value};
}

export function updateEventTemplateStart(id, value) {
  return {type: UPDATE_EVENT_TEMPLATE_START, id, value};
}

export function updateEventTemplateEnd(id, value) {
  return {type: UPDATE_EVENT_TEMPLATE_END, id, value};
}

export function updateRuleSummary(id, value) {
  return {type: UPDATE_RULE_SUMMARY, id, value};
}

export function updateRuleDescription(id, value) {
  return {type: UPDATE_RULE_DESCRIPTION, id, value};
}

export function saveTaskTemplate(id) {
  return {type: SAVE_TASK_TEMPLATE, id};
}

export function saveEventTemplate(id) {
  return {type: SAVE_EVENT_TEMPLATE, id};
}

export function saveRule(id) {
  return {type: SAVE_RULE, id};
}

export function discardTaskTemplate(id) {
  return {type: DISCARD_TASK_TEMPLATE, id};
}

export function discardEventTemplate(id) {
  return {type: DISCARD_EVENT_TEMPLATE, id};
}

export function discardRule(id) {
  return {type: DISCARD_RULE, id};
}

export function removeTask(id) {
  return {type: REMOVE_TASK, id};
}

export function removeEvent(id) {
  return {type: REMOVE_EVENT, id};
}

export function removeTaskTemplate(id) {
  return {type: REMOVE_TASK_TEMPLATE, id};
}

export function removeEventTemplate(id) {
  return {type: REMOVE_EVENT_TEMPLATE, id};
}

export function removeRule(id) {
  return {type: REMOVE_RULE, id};
}

export function addTask(template_id, id, summ, desc, date, done) {
  return {type: ADD_TASK, template_id, id, summ, desc, date, done};
}

export function addEvent(template_id, id, summ, desc, date, time) {
  return {type: ADD_EVENT, template_id, id, summ, desc, date, time};
}

export function toggleTask(id) {
  return {type: TOGGLE_TASK, id};
}

export function toggleTaskVisibilityFilter() {
  return {type: TOGGLE_TASK_VISIBILITY_FILTER};
}

export function toggleEventVisibilityFilter() {
  return {type: TOGGLE_EVENT_VISIBILITY_FILTER};
}

export function incrementWorkDate() {
  return {type: INCREMENT_WORK_DATE};
}

export function unsetShouldSave() {
  return {type: UNSET_SHOULD_SAVE};
}