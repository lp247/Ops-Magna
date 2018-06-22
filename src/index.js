/* global Android */

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {routerMiddleware, ConnectedRouter, goBack} from 'react-router-redux';
import moment from 'moment';

// import registerServiceWorker from './registerServiceWorker';
import ops from './redux/ops';
import './index.css';
import App from './components/App';
import createHistory from 'history/createMemoryHistory';
import {
  loadState,
  subscriber,
  updateStore
} from './utils/maintenance';
import {updateDate} from './redux/actions/date.actions';
import {updateTime} from './redux/actions/time.actions';
import {DAY_CHANGE_HOUR} from './utils/constants';
// import updater from './webworker/updater.worker.js';

// Create history object and router middleware for routing.
const history = createHistory();
const middleware = routerMiddleware(history);

// Load saved state and create store with it.
const persistedState = loadState();
const store = createStore(ops, persistedState, applyMiddleware(middleware));

// Define an event listener for pressing back button.
const backlistener = (e) => {
  if (history.index !== 0) {
    store.dispatch(goBack());
  } else {
    Android.closeApp();
  }
}
window.addEventListener('back', backlistener);

// Update the store.
updateStore(store);

// Register event listener to update store on every new day.
// updater.addEventListener('message', (e) => {
//   if (e.data === 'UPDATE_STORE') {
//     updateStore(store);
//     updater.postMessage('STORE_UPDATED');
//   }
// });

const timeUpdater = () => {
  setInterval(
    () => {
      // console.log(moment().format('HH:mm:ss'));
      store.dispatch(updateTime(moment().format('HH:mm')));
    },
    1000 * 60
  );
}

const dateUpdater = () => {
  setInterval(
    () => {
      store.dispatch(updateDate(moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD')));
    },
    1000 * 60 * 60 * 24
  )
}

const now = moment();
const ms = now.millisecond();
const s = now.second();
const m = now.minute();
const h = now.hour();
setTimeout(timeUpdater, (60 - s) * 1000 - ms);
setTimeout(dateUpdater, (((24 + DAY_CHANGE_HOUR - h) * 60 - m) * 60 - s) * 1000 - ms);

// Subscribe saving subscriber to store changes.
store.subscribe(subscriber(store));

// Render whole app and show notifications.
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();


