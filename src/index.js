import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

// import registerServiceWorker from './registerServiceWorker';
import ops from './redux/ops';
import './index.css';
import App from './components/App';
import history from './utils/history';
import {
  loadState,
  subscriber,
  updateStore
} from './utils/maintenance';

const persistedState = loadState();
const store = createStore(ops, persistedState);

updateStore(store);

store.subscribe(subscriber(store));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();