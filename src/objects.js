import {Map, List} from 'immutable';
import moment from 'moment';

const core = Map({
  id: moment().format(),
  summ: '',
  desc: '',
  single: true,
  months: List(),
  weeks: List(),
  days: List(),
  time: '',
  start: moment().format('YYYY-MM-DD'),
  end: '2999-12-31'
});

export const emptyTask = Map({
  data: core.set('doneAt', List()),
  backup: core
});

export const emptyEvent = Map({
  data: core,
  backup: core
});
