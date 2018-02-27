import React from 'react';
import {Route} from 'react-router-dom';

import {
  Page, ContentWrapper
} from '../sc/container';
import ConnTaskList from './ConnTaskList';
import ConnEventList from './ConnEventList';
import ConnRuleList from './ConnRuleList';
import ConnForm from './ConnForm';

const App = () => (
  <Page>
    <ContentWrapper>
      <Route exact path='/' render={() => [
        <ConnRuleList key={1} />,
        <ConnTaskList key={2} />,
        <ConnEventList key={3} />,
      ]} />
      <Route path='/:type/:id' component={ConnForm} />
    </ContentWrapper>
  </Page>
);

export default App;