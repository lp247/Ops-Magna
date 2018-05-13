import {combineReducers} from 'redux-immutable';

import tasks from './reducer/tasks.reducer';
import events from './reducer/events.reducer';
import rules from './reducer/rules.reducer';
import showTaskTemplates from './reducer/showTaskTemplates.reducer';
import showEventTemplates from './reducer/showEventTemplates.reducer';
import shouldSave from './reducer/shouldSave.reducer';

const ops = combineReducers({
  tasks,
  events,
  rules,
  showTaskTemplates,
  showEventTemplates,
  shouldSave
});

export default ops;