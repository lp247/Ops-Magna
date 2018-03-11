import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Map, fromJS} from 'immutable';
import _ from 'lodash';
import moment from 'moment';

import registerServiceWorker from './registerServiceWorker';
import ops from './redux/reducers';
import './index.css';
import App from './components/App';
import history from './utils/history';
import Recur from './utils/Recur';
import { updateTaskKey, incrementWorkDate, removeTask, removeEvent } from './redux/actions';
import { DAY_CHANGE_HOUR } from './utils/constants';

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

const persistedState = loadState();
const store = createStore(ops, persistedState);

// Bessere Alternative zu throttle benutzen (erst speichern, wenn neue Aufgabe angelegt)
store.subscribe(_.throttle(() => {
  saveState(Map({
    tasks: store.getState().get('tasks'),
    events: store.getState().get('events'),
    rules: store.getState().get('rules'),
    workDate: store.getState().get('workDate')
  }));
}, 1000));

// Maintenance
let wd = moment(store.getState().get('workDate'));
while (wd.isBefore(moment().subtract(DAY_CHANGE_HOUR, 'hours'), 'day')) {
  wd = wd.add(1, 'days');
  let tasks = store.getState().get('tasks');
  for (var i = 1; i < tasks.size; i++) {
    if (Recur.matches(tasks.getIn([i, 'data'], wd))) {
      store.dispatch(updateTaskKey(
        tasks.getIn([i, 'data', 'id']),
        'lastExec',
        Map({date: wd.format('YYYY-MM-DD'), done: false})
      ));
    }
  }
  store.dispatch(incrementWorkDate());
}

let state = store.getState();
let tasks = state.get('tasks');
let events = state.get('events');
for (let i = 1; i < tasks.size; i++) {
  if (
    tasks.getIn([i, 'data', 'lastExec', 'done']) && (
      moment().isAfter(tasks.getIn([i, 'data', 'end']), 'day') ||
      (moment().isAfter(tasks.getIn([i, 'data', 'start']), 'day') && tasks.getIn([i, 'data', 'single']))
    )
  ) {
    store.dispatch(removeTask(tasks.getIn([i, 'data', 'id'])));
  }
}
for (let j = 1; j < events.size; j++) {
  if (
    moment().isAfter(events.getIn([j, 'data', 'end']), 'day') ||
    (moment().isAfter(events.getIn([j, 'data', 'start']), 'day') && events.getIn([j, 'data', 'single']))
  ) {
    store.dispatch(removeEvent(events.getIn([j, 'data', 'id'])));
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
