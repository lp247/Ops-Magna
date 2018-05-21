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
import TitleBar from './TitleBar';

const onTaskFormLeave = (prevState) => {
  console.log('Leave');
  // console.log(prevState.params.id);
}

const App = () => (
  <Page>
    <ContentWrapper>
      <Route exact path='/' render={() => [
        <TitleBar key={1} />,
        <RuleList key={2} />,
        <TaskList key={3} />,
        <EventList key={4} />
      ]} />
      <Route path='/t/:id' component={TaskForm} onLeave={onTaskFormLeave} />
      <Route path='/e/:id' component={EventForm} onLeave={onTaskFormLeave} />
      <Route path='/r/:id' component={RuleForm} onLeave={onTaskFormLeave} />
      <Route path='/tt/:id' component={TaskTemplateForm} onLeave={onTaskFormLeave} />
      <Route path='/et/:id' component={EventTemplateForm} onLeave={onTaskFormLeave} />
    </ContentWrapper>
  </Page>
);

export default App;