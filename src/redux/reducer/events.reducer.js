import moment from 'moment';
import {Map, List} from 'immutable';
import {
	DISCARD_EVENT,
	DISCARD_EVENT_TEMPLATE,
	INCREMENT_EVENT_TEMPLATE_COUNTER,
	REMOVE_EVENT,
	REMOVE_EVENT_TEMPLATE,
	RESET_EVENT_TEMPLATE_COUNTER,
	SAVE_EVENT,
	SAVE_EVENT_TEMPLATE,
	TOGGLE_EVENT_TEMPLATE_DAY,
	TOGGLE_EVENT_TEMPLATE_MONTH,
	TOGGLE_EVENT_TEMPLATE_WEEK,
	UPDATE_EVENT_DATE,
	UPDATE_EVENT_DESCRIPTION,
	UPDATE_EVENT_TEMPLATE_DESCRIPTION,
	UPDATE_EVENT_TEMPLATE_END,
	UPDATE_EVENT_TEMPLATE_N,
	UPDATE_EVENT_SUMMARY,
	UPDATE_EVENT_TEMPLATE_SUMMARY,
	UPDATE_EVENT_TEMPLATE_START,
  UPDATE_EVENT_TIME,
	UPDATE_EVENT_TEMPLATE_TIME
} from '../actions/events.actions';
import {
  UPDATE_LAST_UPDATE
} from '../actions/tasksEventsUpdate.actions';
import {
  discardItem,
  discardTemplate,
	incrementCounter,
  removeItem,
  removeTemplate,
  resetCounter,
  saveEventChanges,
  saveEventTemplateChanges,
  toggleDays,
  toggleMonths,
  toggleWeeks,
  updateEvents,
  updateItemDate,
  updateItemDescription,
  updateItemSummary,
  updateItemTime,
  updateTemplateDescription,
  updateTemplateEnd,
  updateTemplateN,
  updateTemplateTime,
  updateTemplateStart,
  updateTemplateSummary
} from './ReducerHelperFunctions';
import {getEvent, getEventTemplate} from '../../utils/objects';

const events = (
  state = Map({
    templates: List([getEventTemplate('new')]),
    items: List([getEvent('new')]),
    lastUpdate: moment().format('YYYY-MM-DD')
  }),
  action
) => {
  switch (action.type) {
    case DISCARD_EVENT: return discardItem(state, action.id);
    case DISCARD_EVENT_TEMPLATE: return discardTemplate(state, action.id);
    case INCREMENT_EVENT_TEMPLATE_COUNTER: return incrementCounter(state, action.id);
    case REMOVE_EVENT: return removeItem(state, action.id);
    case REMOVE_EVENT_TEMPLATE: return removeTemplate(state, action.id);
    case RESET_EVENT_TEMPLATE_COUNTER: return resetCounter(state, action.id);
    case SAVE_EVENT: return saveEventChanges(state, action.id, action.idGenerator, action.newtid);
    case SAVE_EVENT_TEMPLATE: return saveEventTemplateChanges(state, action.id, action.today, action.idGenerator);
    case TOGGLE_EVENT_TEMPLATE_DAY: return toggleDays(state, action.id, action.value);
    case TOGGLE_EVENT_TEMPLATE_MONTH: return toggleMonths(state, action.id, action.value);
    case TOGGLE_EVENT_TEMPLATE_WEEK: return toggleWeeks(state, action.id, action.value);
    case UPDATE_EVENT_DATE: return updateItemDate(state, action.id, action.value);
    case UPDATE_EVENT_DESCRIPTION: return updateItemDescription(state, action.id, action.value);
    case UPDATE_EVENT_TEMPLATE_DESCRIPTION: return updateTemplateDescription(state, action.id, action.value);
    case UPDATE_EVENT_TEMPLATE_END: return updateTemplateEnd(state, action.id, action.value);
    case UPDATE_EVENT_TEMPLATE_N: return updateTemplateN(state, action.id, action.value);
    case UPDATE_EVENT_SUMMARY: return updateItemSummary(state, action.id, action.value);
    case UPDATE_EVENT_TEMPLATE_SUMMARY: return updateTemplateSummary(state, action.id, action.value);
    case UPDATE_EVENT_TEMPLATE_START: return updateTemplateStart(state, action.id, action.value);
    case UPDATE_EVENT_TIME: return updateItemTime(state, action.id, action.value);
    case UPDATE_EVENT_TEMPLATE_TIME: return updateTemplateTime(state, action.id, action.value);
    case UPDATE_LAST_UPDATE: return updateEvents(state, action.today, action.idGenerator);
    default: return state;
  }
}

export default events;