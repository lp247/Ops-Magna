import {combineReducers} from 'redux-immutable';
import events from './events.reducer.js';
import eventTemplates from './eventTemplates.reducer.js';
import showEventTemplates from './showEventTemplates.reducer.js';
import fastEventText from './fastEventText.reducer.js';
import fastRuleText from './fastRuleText.reducer.js';
import fastTaskText from './fastTaskText.reducer.js';
import rules from './rules.reducer.js';
import shouldSave from './shouldSave.reducer.js';
import tasks from './tasks.reducer.js';
import taskTemplates from './taskTemplates.reducer.js';
import showTaskTemplates from './showTaskTemplates.reducer.js';
import workDate from './workDate.reducer.js';

const ops = combineReducers({
  events,
  eventTemplates,
  showEventTemplates,
  fastTaskText,
  fastEventText,
  fastRuleText,
  rules,
  shouldSave,
  tasks,
  taskTemplates,
  showTaskTemplates,
  workDate
});

export default ops;