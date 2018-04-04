import {List} from 'immutable';
import moment from 'moment';
import _ from 'lodash';
import {
	DISCARD_EVENT_TEMPLATE,
	INCREMENT_EVENT_TEMPLATE_COUNTER,
	REMOVE_EVENT_TEMPLATE,
	RESET_EVENT_TEMPLATE_COUNTER,
	SAVE_EVENT_TEMPLATE,
	TOGGLE_EVENT_TEMPLATE_DAY,
	TOGGLE_EVENT_TEMPLATE_MONTH,
	TOGGLE_EVENT_TEMPLATE_WEEK,
	UPDATE_EVENT_TEMPLATE_DESCRIPTION,
	UPDATE_EVENT_TEMPLATE_END,
	UPDATE_EVENT_TEMPLATE_N,
	UPDATE_EVENT_TEMPLATE_START,
	UPDATE_EVENT_TEMPLATE_SUMMARY,
	UPDATE_EVENT_TEMPLATE_TIME,
} from './eventTemplates.action.js';
import {getEventTemplate} from '../utils/objects.js';
import {
	updateValue,
	incrementValue,
	togglePeriod
} from './helperFunctions.js';
import {DAY_CHANGE_HOUR} from '../utils/constants.js';

function eventTemplates(state = List([getEventTemplate('new')]), action) {
  switch (action.type) {
    case UPDATE_EVENT_TEMPLATE_SUMMARY: return updateValue(state, action.id, 'summ', action.value);
    case UPDATE_EVENT_TEMPLATE_DESCRIPTION: return updateValue(state, action.id, 'desc', action.value);
    case UPDATE_EVENT_TEMPLATE_N: return updateValue(state, action.id, 'n', action.value);
    case RESET_EVENT_TEMPLATE_COUNTER: return updateValue(state, action.id, 'cnt', 0);
    case INCREMENT_EVENT_TEMPLATE_COUNTER: return incrementValue(state, action.id, 'cnt');
    case TOGGLE_EVENT_TEMPLATE_MONTH: return togglePeriod(state, action.id, 'months', action.value);
    case TOGGLE_EVENT_TEMPLATE_WEEK: return togglePeriod(state, action.id, 'weeks', action.value);
    case TOGGLE_EVENT_TEMPLATE_DAY: return togglePeriod(state, action.id, 'days', action.value);
    case UPDATE_EVENT_TEMPLATE_TIME: return updateValue(state, action.id, 'time', action.value);
    case UPDATE_EVENT_TEMPLATE_START: return updateValue(state, action.id, 'start', action.value);
    case UPDATE_EVENT_TEMPLATE_END: return updateValue(state, action.id, 'end', action.value);
    case SAVE_EVENT_TEMPLATE: {
      if (action.id === 'new') {
        let mod = state.setIn([0, 'id'], _.uniqueId());
        if (!mod.getIn([0, 'template', 'start'])) {
          mod = mod.setIn([0, 'template', 'start'], moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD'));
        }
        if (!mod.getIn([0, 'template', 'end'])) {
          mod = mod.setIn([0, 'template', 'end'], '2999-12-31');
        }
        let copied = mod.setIn([0, 'data'], mod.getIn([0, 'template']));
        let ejected = copied.push(copied.get(0));
        return ejected.set(0, getEventTemplate('new'));
      } else {
        let index = state.findIndex(el => el.get('id') === action.id);
        return state.setIn([index, 'data'], state.getIn([index, 'template']));
      }
    }
    case DISCARD_EVENT_TEMPLATE: {
      let index = state.findIndex(el => el.get('id') === action.id);
      if (index > -1) {
        return state.setIn([index, 'template'], state.getIn([index, 'data']));
      } else {
        return state;
      }
    }
    case REMOVE_EVENT_TEMPLATE: {
      if (action.id === 'new') {
        return state.set(0, getEventTemplate('new'));
      } else {
        let index = state.findIndex(el => el.get('id') === action.id);
        if (index > -1) {
          return state.remove(index);
        } else {
          return state;
        }
      }
    }
    default:
      return state;
  }
}

export default eventTemplates;