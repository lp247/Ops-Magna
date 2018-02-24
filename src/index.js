import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Map, fromJS} from 'immutable';
import _ from 'lodash';

import registerServiceWorker from './registerServiceWorker';
import ops from './reducers';
import './index.css';
import App from './App';
import history from './history';

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

store.subscribe(_.throttle(() => {
  saveState(Map({
    tasks: store.getState().get('tasks'),
    events: store.getState().get('events')
  }));
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
