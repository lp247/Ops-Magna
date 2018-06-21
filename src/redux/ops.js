// import {combineReducers} from 'redux-immutable';
import {Map} from 'immutable';

import tasks from './reducer/tasks.reducer';
import events from './reducer/events.reducer';
import reminders from './reducer/reminders.reducer';
import showTaskTemplates from './reducer/showTaskTemplates.reducer';
import showEventTemplates from './reducer/showEventTemplates.reducer';
import shouldSave from './reducer/shouldSave.reducer';
import lang from './reducer/lang.reducer';
import date from './reducer/date.reducer';
import time from './reducer/time.reducer';
import router from './reducer/router.reducer';

// const ops = combineReducers({
//   tasks,
//   events,
//   reminders,
//   X showTaskTemplates,
//   X showEventTemplates,
//   X date,
//   X time,
//   X shouldSave,
//   X lang,
//   X router: routerReducer
// });

const ops = (state = Map(), action) => {
  let oldDate_state = state.get('date');
  let newDate_state = date(state.get('date'), action);
  let time_state = time(state.get('time'), action);
  let shouldSave_state = shouldSave(state.get('shouldSave'), action);
  let lang_state = lang(state.get('lang'), action);
  let router_state = router(state.get('router'), action);
  let showTaskTemplates_state = showTaskTemplates(state.get('showTaskTemplates'), action);
  let showEventTemplates_state = showEventTemplates(state.get('showEventTemplates'), action);
  let tasks_state = tasks(state.get('tasks'), oldDate_state, newDate_state, action);
  let events_state = events(state.get('events'), oldDate_state, newDate_state, action);
  let reminders_state = reminders(state.get('reminders'), action);
  return Map({
    date: newDate_state,
    time: time_state,
    shouldSave: shouldSave_state,
    lang: lang_state,
    router: router_state,
    showTaskTemplates: showTaskTemplates_state,
    showEventTemplates: showEventTemplates_state,
    tasks: tasks_state,
    events: events_state,
    reminders: reminders_state
  });
};

export default ops;