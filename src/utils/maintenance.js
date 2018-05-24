import {fromJS, Map} from 'immutable';

import {unsetShouldSave} from '../redux/actions/shouldSave.actions';
import {updateLastUpdate} from '../redux/actions/tasksEventsUpdate.actions';

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
    lang: store.getState().get('lang')
  }));
}

export const subscriber = (store) => () => {
  if (store.getState().get('shouldSave')) {
    saveStore(store);
    store.dispatch(unsetShouldSave());
  }
}

export const updateStore = (store) => store.dispatch(updateLastUpdate());