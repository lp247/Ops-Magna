import {Map, List} from 'immutable';

const taskcore = Map({
  id: '',
  summ: '',
  desc: '',
  single: true,
  months: List(),
  weeks: List(),
  days: List(),
  time: '',
  start: '',
  end: '',
  lastExec: Map({
    date: '',
    done: false
  })
})

const eventcore = Map({
  id: '',
  summ: '',
  desc: '',
  single: true,
  months: List(),
  weeks: List(),
  days: List(),
  time: '',
  start: '',
  end: ''
});

const rulecore = Map({
  id: '',
  summ: '',
  desc: ''
})

export const emptyTask = Map({
  data: taskcore,
  backup: taskcore
});

export const emptyEvent = Map({
  data: eventcore,
  backup: eventcore
});

export const emptyRule = Map({
  data: rulecore,
  backup: rulecore
})

export const newTask = Map({
  data: taskcore.set('id', 'new'),
  backup: taskcore.set('id', 'new')
});

export const newEvent = Map({
  data: eventcore.set('id', 'new'),
  backup: eventcore.set('id', 'new')
});

export const newRule = Map({
  data: rulecore.set('id', 'new'),
  backup: rulecore.set('id', 'new')
});