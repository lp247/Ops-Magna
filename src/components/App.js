import React from 'react';
import {Route} from 'react-router-dom';

import {Page, ContentWrapper} from '../sc/container';
import TaskList from './TaskList.js';
import EventList from './EventList.js';
import RuleList from './RuleList.js';
import TaskForm from './TaskForm.js';
import EventForm from './EventForm.js';

const App = () => (
  <Page>
    <ContentWrapper>
      <Route exact path='/' render={() => [
        <RuleList key={1} />,
        <TaskList key={2} />,
        <EventList key={3} />,
      ]} />
      <Route path='/task/:id' component={TaskForm} />
      <Route path='/event/:id' component={EventForm} />
    </ContentWrapper>
  </Page>
);

export default App;