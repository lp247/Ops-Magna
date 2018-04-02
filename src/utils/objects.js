import {Map, List} from 'immutable';

// TASKS

/**
 * @typedef {Object} TaskTemplateCore 
 */
const taskTemplateCore = Map({
  summ: '',
  desc: '',
  n: 1,
  cnt: 0,
  months: List(),
  weeks: List(),
  days: List(),
  time: '',
  start: '',
  end: ''
});

/**
 * @typedef {Object} EmptyTaskTemplate
 */
export const emptyTaskTemplate = Map({
  id: '',
  template: taskTemplateCore,
  data: taskTemplateCore
});

export const newTaskTemplate = emptyTaskTemplate.set('id', 'new');

export const task = Map({
  template_id: '',
  id: '',
  summ: '',
  desc: '',
  date: '',
  done: ''
});

// EVENTS

const eventTemplateCore = Map({
  summ: '',
  desc: '',
  n: 1,
  cnt: 0,
  months: List(),
  weeks: List(),
  days: List(),
  time: '',
  start: '',
  end: ''
});


export const emptyEventTemplate = Map({
  id: '',
  template: eventTemplateCore,
  data: eventTemplateCore
});

export const newEventTemplate = emptyEventTemplate.set('id', 'new');

export const event = Map({
  template_id: '',
  id: '',
  summ: '',
  desc: '',
  date: '',
  time: ''
});

// RULES

const ruleCore = Map({
  summ: '',
  desc: ''
});


export const emptyRule = Map({
  id: '',
  template: ruleCore,
  data: ruleCore
});

export const newRule = emptyRule.set('id', 'new');