import React from 'react';
import {Route} from 'react-router-dom';

import Page from './container/Page';
import ContentWrapper from './container/ContentWrapper';
import TaskList from './lists/TaskList';
import EventList from './lists/EventList';
import ReminderList from './lists/ReminderList';
import TaskForm from './forms/TaskForm';
import EventForm from './forms/EventForm';
import ReminderForm from './forms/ReminderForm';
import TaskTemplateForm from './forms/TaskTemplateForm';
import EventTemplateForm from './forms/EventTemplateForm';
import TitleBar from './lists/TitleBar';

const App = () => (
  <Page>
    <ContentWrapper>
      <Route exact path='/' render={() => [
        <TitleBar key={1} />,
        <ReminderList key={2} />,
        <TaskList key={3} />,
        <EventList key={4} />
      ]} />
      <Route path='/t/:id' component={TaskForm} />
      <Route path='/e/:id' component={EventForm} />
      <Route path='/r/:id' component={ReminderForm} />
      <Route path='/tt/:id' component={TaskTemplateForm} />
      <Route path='/et/:id' component={EventTemplateForm} />
    </ContentWrapper>
  </Page>
);

export default App;