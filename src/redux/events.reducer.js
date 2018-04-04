import {List} from 'immutable';
import _ from 'lodash';
import {
	ADD_EVENT,
	DISCARD_EVENT,
	REMOVE_EVENT,
	SAVE_EVENT,
	UPDATE_EVENT_DATE,
	UPDATE_EVENT_DESCRIPTION,
	UPDATE_EVENT_SUMMARY,
	UPDATE_EVENT_TIME,
} from './events.actions.js';
import {REMOVE_EVENT_TEMPLATE} from './eventTemplates.action.js';
import {updateValue} from './helperFunctions.js';
import {getEvent} from '../utils/objects.js';

export function events(state = List(), action) {
  switch (action.type) {
    case UPDATE_EVENT_SUMMARY: return updateValue(state, action.id, 'summ', action.value);
    case UPDATE_EVENT_DESCRIPTION: return updateValue(state, action.id, 'desc', action.value);
    case UPDATE_EVENT_DATE: return updateValue(state, action.id, 'date', action.value);
    case UPDATE_EVENT_TIME: return updateValue(state, action.id, 'time', action.value);
    case ADD_EVENT: {
      let index = state.findIndex(x => x.get('templateID') === action.templateID);
      let mod = state;
      if (index > -1 && action.templateID) {
        mod = state.delete(index);
      }
      return mod.push(getEvent(
        action.templateID,
        _.uniqueId(),
        action.summ,
        action.desc,
        action.date,
        action.time
      ));
    }
    case SAVE_EVENT: {
      let index = state.findIndex(x => x.get('id') === action.id);
      if (index > -1 && !state.getIn([index, 'templateID'])) {
        return state.setIn([index, 'data'], state.getIn([index, 'template']));
      } else {
        return state;
      }
    }
    case DISCARD_EVENT: {
      let index = state.findIndex(x => x.get('id') === action.id);
      if (index > -1) {
        return state.setIn([index, 'template'], state.getIn([index, 'data']));
      } else {
        return state;
      }
    }
    case REMOVE_EVENT: {
      let index = state.findIndex(x => x.get('id') === action.id);
      if (index > -1 && !state.getIn([index, 'templateID'])) {
        return state.delete(index);
      } else {
        return state;
      }
    }
    case REMOVE_EVENT_TEMPLATE: {
      return state.filterNot(x => x.get('templateID') === action.id);
    }
    default:
      return state;
  }
}

export default events;