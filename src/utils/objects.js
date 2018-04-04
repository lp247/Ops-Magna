import {Map, List} from 'immutable';

// TASKS

/**
 * @typedef {Object} TaskTemplateCore 
 */
const getTaskTemplateCore = (
  summ = '',
  desc = '',
  n = 1,
  cnt = 0,
  months = List(),
  weeks = List(),
  days = List(),
  time = '',
  start = '',
  end = '',
) => Map({summ, desc, n, cnt, months, weeks, days, time, start, end});

export const getTaskTemplate = (ID, summ, desc, n, cnt, m, w, d, time, start, end) => {
  let core = getTaskTemplateCore(summ, desc, n, cnt, m, w, d, time, start, end);
  return Map({
    ID,
    template: core,
    data: core
  });
}

const getTaskCore = (
  summ = '',
  desc = '',
  date = '',
  time = '',
  done = false
) => Map({summ, desc, date, time, done});

export const getTask = (tID, ID, summ, desc, date, time, done) => {
  let core = getTaskCore(summ, desc, date, time, done);
  return Map({
    templateID: tID,
    id: ID,
    template: core,
    data: core
  });
}

// EVENTS

const getEventTemplateCore = (
  summ = '',
  desc = '',
  n = 1,
  cnt = 0,
  months = List(),
  weeks = List(),
  days = List(),
  time = '',
  start = '',
  end = ''
) => Map({summ, desc, n, cnt, months, weeks, days, time, start, end});

export const getEventTemplate = (ID, summ, desc, n, cnt, m, w, d, time, start, end) => {
  let core = getEventTemplateCore(summ, desc, n, cnt, m, w, d, time, start, end);
  return Map({
    id: ID,
    template: core,
    data: core
  });
}

const getEventCore = (
  summ = '',
  desc = '',
  date = '',
  time = ''
) => Map({summ, desc, date, time});

export const getEvent = (tID, ID, summ, desc, date, time) => {
  let core = getEventCore(summ, desc, date, time);
  return Map({
    templateID: tID,
    id: ID,
    template: core,
    data: core
  });
}

// RULES

const getRuleCore = (summ = '', desc = '') => Map({summ, desc});

export const getRule = (ID, summ, desc) => {
  let core = getRuleCore(summ, desc);
  return Map({
    id: ID,
    template: core,
    data: core
  });
}