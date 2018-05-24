import {Map, List} from 'immutable';
import {
	DISCARD_REMINDER,
	REMOVE_REMINDER,
	SAVE_REMINDER,
	UPDATE_REMINDER_DESCRIPTION,
	UPDATE_REMINDER_SUMMARY
} from '../actions/reminders.actions';
import {
  discardItem,
  removeItem,
  saveReminderChanges,
  updateItemDescription,
  updateItemSummary
} from './ReducerHelperFunctions';
import {getReminder} from '../../utils/objects';

export function reminders(
  state = Map({
    items: List([getReminder('new')])
  }),
  action
) {
  switch (action.type) {
    case DISCARD_REMINDER: return discardItem(state, action.id);
    case REMOVE_REMINDER: return removeItem(state, action.id);
    case SAVE_REMINDER: return saveReminderChanges(state, action.id, action.idGenerator);
    case UPDATE_REMINDER_DESCRIPTION: return updateItemDescription(state, action.id, action.value);
    case UPDATE_REMINDER_SUMMARY: return updateItemSummary(state, action.id, action.value);
    default: return state;
  }
}

export default reminders;