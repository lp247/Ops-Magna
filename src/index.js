import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Map} from 'immutable';

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
    return Map(JSON.parse(serializedState));
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {

  }
};

const persistedState = loadState();
const store = createStore(ops, persistedState);

store.subscribe(() => {
  saveState({
    tasks: store.getState().tasks,
    events: store.getState().events
  });
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
      {/* <Switch>
        <Route path='/new/:type/:text' component={Form} />
        <Route path='/edit/:type/:id' component={Form} />
        <Route path='/' component={Home} />
      </Switch> */}
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
