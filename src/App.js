import React from 'react';
import {Route} from 'react-router-dom';

import {
  Page, ContentWrapper
} from './sc/container';
import {ConnTaskList, ConnEventList} from './ConnList';
import ConnForm from './ConnForm';

const App = () => (
  <Page>
    <ContentWrapper>
      <Route exact path='/' component={ConnTaskList} />
      <Route exact path='/' component={ConnEventList} />
      <Route path='/:type/:id' component={ConnForm} />
    </ContentWrapper>
  </Page>
);

export default App;