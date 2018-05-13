import React from 'react';
import {Route} from 'react-router-dom';

import Page from './container/Page';
import ContentWrapper from './container/ContentWrapper';
import TaskList from './lists/TaskList';
import EventList from './lists/EventList';
import RuleList from './lists/RuleList';
import TaskForm from './forms/TaskForm';
import EventForm from './forms/EventForm';
import RuleForm from './forms/RuleForm';
import TaskTemplateForm from './forms/TaskTemplateForm';
import EventTemplateForm from './forms/EventTemplateForm';

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