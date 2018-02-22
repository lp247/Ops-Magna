import {Map, List} from 'immutable';

const core = Map({
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

export const emptyTask = Map({
  data: core.set('doneAt', List()),
  backup: core.set('doneAt', List())
});

export const emptyEvent = Map({
  data: core,
  backup: core
});

export const newTask = Map({
  data: core.set('doneAt', List()).set('id', 'new'),
  backup: core.set('doneAt', List()).set('id', 'new')
});

export const newEvent = Map({
  data: core.set('id', 'new'),
  backup: core.set('id', 'new')
});