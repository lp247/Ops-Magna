import {Map, List} from 'immutable';
import moment from 'moment';
import {DAY_CHANGE_HOUR} from './constants';

// =================================================================================================
//           TASKS
// =================================================================================================

const getTaskTemplateCore = (summ, desc, n, months, weeks, days, time, start, end) => {
  return Map({summ, desc, n, months, weeks, days, time, start, end});
}

export const getTaskTemplate = (
  id,
  summ = '',
  desc = '',
  n = -1,
  cnt = 0,
  months = List(),
  weeks = List(),
  days = List(),
  time = '',
  start = moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD'),
  end = ''
) => {
  let core = getTaskTemplateCore(summ, desc, n, months, weeks, days, time, start, end);
  return Map({
    id,
    cnt,
    tmp: core,
    data: core
  });
}

const getTaskCore = (summ, desc, date, time, done) => Map({summ, desc, date, time, done});

export const getTask = (
  id,
  tid = '',
  summ = '',
  desc = '',
  date = moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD'),
  time = '',
  done = false
) => {
  let core = getTaskCore(summ, desc, date, time, done);
  return Map({
    id,
    tid,
    tmp: core,
    data: core
  });
}

// =================================================================================================
//           EVENTS
// =================================================================================================

const getEventTemplateCore = (summ, desc, n, months, weeks, days, time, start, end) => {
  return Map({summ, desc, n, months, weeks, days, time, start, end});
}

export const getEventTemplate = (
  id,
  summ = '',
  desc = '',
  n = -1,
  cnt = 0,
  months = List(),
  weeks = List(),
  days = List(),
  time = '',
  start = moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD'),
  end = ''
) => {
  let core = getEventTemplateCore(summ, desc, n, months, weeks, days, time, start, end);
  return Map({
    id,
    cnt,
    tmp: core,
    data: core
  });
}

const getEventCore = (summ, desc, date, time) => Map({summ, desc, date, time});

export const getEvent = (
  id,
  tid = '',
  summ = '',
  desc = '',
  date = moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD'),
  time = ''
) => {
  let core = getEventCore(summ, desc, date, time);
  return Map({
    id,
    tid,
    tmp: core,
    data: core
  });
}

// =================================================================================================
//           REMINDERS
// =================================================================================================

const getReminderCore = (summ, desc) => Map({summ, desc});

export const getReminder = (
  id,
  summ = '',
  desc = ''
) => {
  let core = getReminderCore(summ, desc);
  return Map({
    id,
    tmp: core,
    data: core
  });
}