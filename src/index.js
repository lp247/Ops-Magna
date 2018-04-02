import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Map, fromJS} from 'immutable';
import moment from 'moment';
import _ from 'lodash';

import registerServiceWorker from './registerServiceWorker';
import ops from './redux/reducers';
import './index.css';
import App from './components/App';
import history from './utils/history';
import { unsetShouldSave, incrementWorkDate, addTask, removeTask } from './redux/actions';
import { DAY_CHANGE_HOUR } from './utils/constants';
import Recur from './utils/Recur';

const loadState = () => {
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

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.toJS());
    localStorage.setItem('state', serializedState);
  } catch (err) {

  }
};

const saveStore = () => {
  if (store.getState().get('shouldSave')) {
    saveState(Map({
      tasks: store.getState().get('tasks'),
      taskTemplates: store.getState().get('taskTemplates'),
      events: store.getState().get('events'),
      eventTemplates: store.getState().get('eventTemplates'),
      rules: store.getState().get('rules'),
      workDate: store.getState().get('workDate')
    }))
  }
  store.dispatch(unsetShouldSave());
}

const updateEntries = (store) => {
  let wd = moment(store.getState().get('workDate'));
  while (wd.isBefore(moment().subtract(DAY_CHANGE_HOUR, 'hours'), 'day')) {
    let tasks = store.getState().get('tasks');
    let events = store.getState().get('events');
    let tt = store.getState().get('taskTemplates');
    let et = store.getState().get('eventTemplates');
    for (var a = 1; a < tasks.size; a++) {
      if (tasks.getIn([a, 'done']) && moment().isAfter(tasks.getIn([a, 'date']), 'day')) {
        store.dispatch(removeTask(tasks.getIn([a, 'id'])))
      }
    }
    for (var b = 1; b < events.size; b++) {
      if (moment().isAfter(events.getIn([b, 'date']), 'day')) {
        store.dispatch(removeTask(events.getIn([b, 'id'])))
      }
    }
    for (var i = 1; i < tt.size; i++) {
      if (Recur.matches(tt.getIn([i, 'data']), wd)) {
        store.dispatch(addTask(
          tt.getIn([i, 'data', 'id']),
          _.uniqueId(),
          tt.getIn([i, 'data', 'summ']),
          tt.getIn([i, 'data', 'desc']),
          wd,
          false
        ));
      }
    }
    for (var j = 1; j < et.size; j++) {
      if (Recur.matches(et.getIn([j, 'data']), wd)) {
        store.dispatch(addTask(
          et.getIn([j, 'data', 'id']),
          _.uniqueId(),
          et.getIn([j, 'data', 'summ']),
          et.getIn([j, 'data', 'desc']),
          wd,
          et.getIn([j, 'data', 'time'])
        ));
      }
    }
    store.dispatch(incrementWorkDate());
  }
}

const persistedState = loadState();
const store = createStore(ops, persistedState);

store.subscribe(saveStore);

updateEntries(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
