import {Map, List} from 'immutable';
import moment from 'moment';
import {
	DISCARD_TASK,
  DISCARD_TASK_TEMPLATE,
	INCREMENT_TASK_TEMPLATE_COUNTER,
	REMOVE_TASK,
	REMOVE_TASK_TEMPLATE,
	RESET_TASK_TEMPLATE_COUNTER,
	SAVE_TASK,
  SAVE_TASK_TEMPLATE,
  TOGGLE_TASK_DONE,
	TOGGLE_TASK_TEMPLATE_DAY,
	TOGGLE_TASK_TEMPLATE_MONTH,
	TOGGLE_TASK_TEMPLATE_WEEK,
	UPDATE_TASK_DATE,
	UPDATE_TASK_DESCRIPTION,
	UPDATE_TASK_TEMPLATE_DESCRIPTION,
	UPDATE_TASK_TEMPLATE_END,
  UPDATE_TASK_TEMPLATE_N,
	UPDATE_TASK_SUMMARY,
	UPDATE_TASK_TEMPLATE_SUMMARY,
	UPDATE_TASK_TEMPLATE_START,
  UPDATE_TASK_TIME,
	UPDATE_TASK_TEMPLATE_TIME
} from '../actions/tasks.actions';
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
  saveTaskChanges,
  saveTaskTemplateChanges,
  toggleDays,
  toggleDone,
  toggleMonths,
  toggleWeeks,
  updateItemDate,
  updateItemDescription,
  updateItemSummary,
  updateItemTime,
  updateTasks,
  updateTemplateDescription,
  updateTemplateEnd,
  updateTemplateN,
  updateTemplateTime,
  updateTemplateStart,
  updateTemplateSummary,
} from './ReducerHelperFunctions';
import {getTask, getTaskTemplate} from '../../utils/objects';
import {DAY_CHANGE_HOUR} from '../../utils/constants';

const tasks = (
  state = Map({
    templates: List([getTaskTemplate('new')]),
    items: List([getTask('new')]),
    lastUpdate: moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD')
  }),
  action
) => {
  switch (action.type) {
    case DISCARD_TASK: return discardItem(state, action.id);
    case DISCARD_TASK_TEMPLATE: return discardTemplate(state, action.id);
    case INCREMENT_TASK_TEMPLATE_COUNTER: return incrementCounter(state, action.id);
    case REMOVE_TASK: return removeItem(state, action.id);
    case REMOVE_TASK_TEMPLATE: return removeTemplate(state, action.id);
    case RESET_TASK_TEMPLATE_COUNTER: return resetCounter(state, action.id);
    case SAVE_TASK: return saveTaskChanges(state, action.id, action.idGenerator, action.newtid);
    case SAVE_TASK_TEMPLATE: return saveTaskTemplateChanges(state, action.id, action.today, action.idGenerator);
    case TOGGLE_TASK_DONE: return toggleDone(state, action.id);
    case TOGGLE_TASK_TEMPLATE_DAY: return toggleDays(state, action.id, action.value);
    case TOGGLE_TASK_TEMPLATE_MONTH: return toggleMonths(state, action.id, action.value);
    case TOGGLE_TASK_TEMPLATE_WEEK: return toggleWeeks(state, action.id, action.value);
    case UPDATE_TASK_DATE: return updateItemDate(state, action.id, action.value);
    case UPDATE_TASK_DESCRIPTION: return updateItemDescription(state, action.id, action.value);
    case UPDATE_TASK_TEMPLATE_DESCRIPTION: return updateTemplateDescription(state, action.id, action.value);
    case UPDATE_TASK_TEMPLATE_END: return updateTemplateEnd(state, action.id, action.value);
    case UPDATE_TASK_TEMPLATE_N: return updateTemplateN(state, action.id, action.value);
    case UPDATE_TASK_SUMMARY: return updateItemSummary(state, action.id, action.value);
    case UPDATE_TASK_TEMPLATE_SUMMARY: return updateTemplateSummary(state, action.id, action.value);
    case UPDATE_TASK_TEMPLATE_START: return updateTemplateStart(state, action.id, action.value);
    case UPDATE_TASK_TIME: return updateItemTime(state, action.id, action.value);
    case UPDATE_TASK_TEMPLATE_TIME: return updateTemplateTime(state, action.id, action.value);
    case UPDATE_LAST_UPDATE: return updateTasks(state, action.today, action.idGenerator);
    default: return state;
  }
}

export default tasks;