function ValueMissingException(message) {
  this.message = message;
  this.name = 'ValueMissingException';
}

export const EJECT_NEW_TASK = 'EJECT_NEW_TASK';
export const EJECT_NEW_EVENT = 'EJECT_NEW_EVENT';
export const RESET_TASK_DATA = 'RESET_TASK_DATA';
export const RESET_EVENT_DATA = 'RESET_EVENT_DATA';
export const UPDATE_TASK_BACKUP = 'UPDATE_TASK_BACKUP';
export const UPDATE_EVENT_BACKUP = 'UPDATE_EVENT_BACKUP';
export const REMOVE_TASK = 'REMOVE_TASK';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const TOGGLE_TASK_VISIBILITY_FILTER = 'SET_TASK_VISIBILITY_FILTER';
export const TOGGLE_EVENT_VISIBILITY_FILTER = 'SET_EVENT_VISIBILITY_FILTER';
export const UPDATE_TASK_KEY = 'UPDATE_TASK_KEY';
export const UPDATE_EVENT_KEY = 'UPDATE_EVENT_KEY';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_TODAY: 'SHOW_TODAY'
};

export function ejectNewTask() {
  return {type: EJECT_NEW_TASK};
}

export function ejectNewEvent() {
  return {type: EJECT_NEW_EVENT};
}

export function resetTaskData(id) {
  if (id === undefined) throw new ValueMissingException('id undefined');
  return {type: RESET_TASK_DATA, id};
}

export function resetEventData(id) {
  if (id === undefined) throw new ValueMissingException('id undefined');
  return {type: RESET_EVENT_DATA, id};
}

export function updateTaskBackup(id) {
  if (id === undefined) throw new ValueMissingException('id undefined');
  return {type: UPDATE_TASK_BACKUP, id};
}

export function updateEventBackup(id) {
  if (id === undefined) throw new ValueMissingException('id undefined');
  return {type: UPDATE_EVENT_BACKUP, id};
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

export function toggleTaskVisibilityFilter() {
  return {type: TOGGLE_TASK_VISIBILITY_FILTER};
}

export function toggleEventVisibilityFilter() {
  return {type: TOGGLE_EVENT_VISIBILITY_FILTER};
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