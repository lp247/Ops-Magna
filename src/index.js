import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import ops from './reducers';
import './index.css';
import App from './App';
import history from './history';

let store = createStore(ops);

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
