import {combineReducers} from 'redux-immutable';

import tasks from './reducer/tasks.reducer';
import events from './reducer/events.reducer';
import reminders from './reducer/reminders.reducer';
import showTaskTemplates from './reducer/showTaskTemplates.reducer';
import showEventTemplates from './reducer/showEventTemplates.reducer';
import shouldSave from './reducer/shouldSave.reducer';
import lang from './reducer/lang.reducer';

const ops = combineReducers({
  tasks,
  events,
  reminders,
  showTaskTemplates,
  showEventTemplates,
  shouldSave,
  lang
});

export default ops;