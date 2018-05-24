import _ from 'lodash';

export const DISCARD_REMINDER = 'DISCARD_REMINDER';
export const REMOVE_REMINDER = 'REMOVE_REMINDER';
export const SAVE_REMINDER = 'SAVE_REMINDER';
export const UPDATE_REMINDER_DESCRIPTION = 'UPDATE_REMINDER_DESCRIPTION';
export const UPDATE_REMINDER_SUMMARY = 'UPDATE_REMINDER_SUMMARY';

export function discardReminder(id) {
	return {type: DISCARD_REMINDER, id};
}

export function removeReminder(id) {
  return {type: REMOVE_REMINDER, id};
}

export function saveReminder(id, idGenerator = _.uniqueId) {
	return {type: SAVE_REMINDER, id, idGenerator};
}

export function updateReminderDescription(id, value) {
	return {type: UPDATE_REMINDER_DESCRIPTION, id, value};
}

export function updateReminderSummary(id, value) {
	return {type: UPDATE_REMINDER_SUMMARY, id, value};
}