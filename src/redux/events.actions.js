export const ADD_EVENT = 'ADD_EVENT';
export const DISCARD_EVENT = 'DISCARD_EVENT';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const SAVE_EVENT = 'SAVE_EVENT';
export const UPDATE_EVENT_DATE = 'UPDATE_EVENT_DATE';
export const UPDATE_EVENT_DESCRIPTION = 'UPDATE_EVENT_DESCRIPTION';
export const UPDATE_EVENT_SUMMARY = 'UPDATE_EVENT_SUMMARY';
export const UPDATE_EVENT_TIME = 'UPDATE_EVENT_TIME';

export function addEvent(templateID, summ, desc, date, time) {
	return {type: ADD_EVENT, templateID, summ, desc, date, time};
}

export function discardEvent(id) {
	return {type: DISCARD_EVENT, id};
}

export function removeEvent(id) {
  return {type: REMOVE_EVENT, id};
}

export function saveEvent(id) {
	return {type: SAVE_EVENT, id};
}

export function updateEventDate(id, value) {
	return {type: UPDATE_EVENT_DATE, id, value};
}

export function updateEventDescription(id, value) {
	return {type: UPDATE_EVENT_DESCRIPTION, id, value};
}

export function updateEventSummary(id, value) {
	return {type: UPDATE_EVENT_SUMMARY, id, value};
}

export function updateEventTime(id, value) {
  return {type: UPDATE_EVENT_TIME, id, value};
}