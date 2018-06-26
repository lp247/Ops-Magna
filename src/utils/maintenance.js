import {fromJS, Map} from 'immutable';
import moment from 'moment';

import {unsetShouldSave} from '../redux/actions/shouldSave.actions';
import {updateDate} from '../redux/actions/date.actions';
import {DAY_CHANGE_HOUR} from './constants';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return fromJS(JSON.parse(serializedState));
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.toJS());
    localStorage.setItem('state', serializedState);
  } catch (err) {

  }
};

export const saveStore = (store) => {
  saveState(Map({
    tasks: store.getState().get('tasks'),
    events: store.getState().get('events'),
    reminders: store.getState().get('reminders'),
    lang: store.getState().get('lang'),
    date: store.getState().get('date'),
    time: store.getState().get('time')
  }));
}

export const subscriber = (store) => () => {
  if (store.getState().get('shouldSave')) {
    saveStore(store);
    store.dispatch(unsetShouldSave());
  }
}

export const updateStore = (store) => {
  store.dispatch(updateDate(moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD')));
}