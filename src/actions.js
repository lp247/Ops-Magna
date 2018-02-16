function ValueMissingException(message) {
  this.message = message;
  this.name = 'ValueMissingException';
}

export const ADD_TASK = 'ADD_TASK';
export const ADD_EVENT = 'ADD_EVENT';
export const NEW_TASK = 'NEW_TASK';
export const NEW_EVENT = 'NEW_EVENT';
export const REMOVE_TASK = 'REMOVE_TASK';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const EDIT_EVENT = 'EDIT_EVENT';
export const TOGGLE_TASK_VISIBILITY_FILTER = 'SET_TASK_VISIBILITY_FILTER';
export const TOGGLE_EVENT_VISIBILITY_FILTER = 'SET_EVENT_VISIBILITY_FILTER';
export const UPDATE_FTT = 'UPDATE_FTT';
export const UPDATE_FET = 'UPDATE_FET';
export const UPDATE_TASK_KEY = 'UPDATE_TASK_KEY';
export const UPDATE_EVENT_KEY = 'UPDATE_EVENT_KEY';
export const CLR_FORMDATA = 'CLR_FORMDATA';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_TODAY: 'SHOW_TODAY'
};

export function addTask(task) {
  if (task === undefined) throw new ValueMissingException('task undefined');
  return {type: ADD_TASK, task};
}

export function addEvent(event) {
  if (event === undefined) throw new ValueMissingException('event undefined');
  return {type: ADD_EVENT, event};
}

export function newTask(text) {
  return {type: NEW_TASK, text};
}

export function newEvent(text) {
  return {type: NEW_EVENT, text};
}

export function removeTask(id) {
  if (id === undefined) throw new ValueMissingException('id undefined');
  return {type: REMOVE_TASK, id};
}

export function removeEvent(id) {
  if (id === undefined) throw new ValueMissingException('id undefined');
  return {type: REMOVE_EVENT, id};
}

export function toggleTask(id, date) {
  if (id === undefined) throw new ValueMissingException('id undefined');
  if (date === undefined) throw new ValueMissingException('date undefined');
  return {type: TOGGLE_TASK, id, date};
}

export function editTask(id) {
  if (id === undefined) throw new ValueMissingException('id undefined');
  return {type: EDIT_TASK, id};
}

export function editEvent(id) {
  if (id === undefined) throw new ValueMissingException('id undefined');
  return {type: EDIT_EVENT, id};
}

export function toggleTaskVisibilityFilter() {
  return {type: TOGGLE_TASK_VISIBILITY_FILTER};
}

export function toggleEventVisibilityFilter() {
  return {type: TOGGLE_EVENT_VISIBILITY_FILTER};
}

export function updateFTT(text) {
  if (text === undefined) throw new ValueMissingException('text undefined');
  return {type: UPDATE_FTT, text};
}

export function updateFET(text) {
  if (text === undefined) throw new ValueMissingException('text undefined');
  return {type: UPDATE_FET, text};
}

export function updateTaskKey(id, key, value) {
  if (id === undefined) throw new ValueMissingException('id undefined');
  if (key === undefined) throw new ValueMissingException('key undefined');
  if (value === undefined) throw new ValueMissingException('value undefined');
  return {type: UPDATE_TASK_KEY, id, key, value}
}

export function updateEventKey(id, key, value) {
  if (id === undefined) throw new ValueMissingException('id undefined');
  if (key === undefined) throw new ValueMissingException('key undefined');
  if (value === undefined) throw new ValueMissingException('value undefined');
  return {type: UPDATE_EVENT_KEY, id, key, value}
}

export function clearFormdata() {
  return {type: CLR_FORMDATA}
}