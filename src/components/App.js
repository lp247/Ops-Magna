import React from 'react';
import {Route} from 'react-router-dom';

import {Page, ContentWrapper} from '../sc/container';
import TaskList from './TaskList.js';
import EventList from './EventList.js';
import RuleList from './RuleList.js';
import TaskForm from './TaskForm.js';
import EventForm from './EventForm.js';
import RuleForm from './RuleForm.js';
import TaskTemplateForm from './TaskTemplateForm.js';
import EventTemplateForm from './EventTemplateForm.js';

const App = () => (
  <Page>
    <ContentWrapper>
      <Route exact path='/' render={() => [
        <RuleList key={1} />,
        <TaskList key={2} />,
        <EventList key={3} />,
      ]} />
      <Route path='/t/:id' component={TaskForm} />
      <Route path='/e/:id' component={EventForm} />
      <Route path='/r/:id' component={RuleForm} />
      <Route path='/tt/:id' component={TaskTemplateForm} />
      <Route path='/et/:id' component={EventTemplateForm} />
    </ContentWrapper>
  </Page>
);

export default App;