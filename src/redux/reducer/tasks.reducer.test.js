jest.unmock('immutable');
jest.unmock('moment');

import {Map, List} from 'immutable';
import moment from 'moment';
import tasks from './tasks.reducer';
import {discardTask, removeTask, discardTaskTemplate, incrementTaskTemplateCounter, removeTaskTemplate, resetTaskTemplateCounter, saveTask, saveTaskTemplate, toggleTaskDone, toggleTaskTemplateDay, toggleTaskTemplateWeek, toggleTaskTemplateMonth, updateTaskDate, updateTaskDescription, updateTaskTemplateDescription, updateTaskTemplateEnd, updateTaskTemplateN, updateTaskSummary, updateTaskTemplateSummary, updateTaskTemplateStart, updateTaskTime, updateTaskTemplateTime} from '../actions/tasks.actions';
import {getTask, getTaskTemplate} from '../../utils/objects';
import {updateLastUpdate} from '../actions/tasksEventsUpdate.actions';

const mockfn = jest.fn()
	.mockReturnValueOnce('100')
	.mockReturnValueOnce('101')
	.mockReturnValueOnce('102')
	.mockReturnValueOnce('103')
	.mockReturnValueOnce('104')
	.mockReturnValueOnce('105')
	.mockReturnValueOnce('106')
	.mockReturnValueOnce('107')
	.mockReturnValueOnce('108')
	.mockReturnValueOnce('109')
	.mockReturnValueOnce('110')
	.mockReturnValueOnce('111')
	.mockReturnValueOnce('112')
	.mockReturnValueOnce('113')
	.mockReturnValueOnce('114')
	.mockReturnValueOnce('115')
	.mockReturnValueOnce('116')
	.mockReturnValueOnce('117')
	.mockReturnValueOnce('118')
	.mockReturnValueOnce('119')
	.mockReturnValueOnce('120')
	.mockReturnValueOnce('121')
	.mockReturnValueOnce('122')
	.mockReturnValueOnce('123')
	.mockReturnValueOnce('124')
	.mockReturnValueOnce('125')
	.mockReturnValueOnce('126')
	.mockReturnValueOnce('127')
	.mockReturnValueOnce('128')
	.mockReturnValueOnce('129')
	.mockReturnValueOnce('130')
	.mockReturnValue('too much')

const range = (start, end) => {
  return Array(end - start).fill().map((_, idx) => start + idx);
}

const tProto = Map({
	summ: 'A task',
	desc: 'A task with a description',
	date: '2018-05-14',
	time: '22:00',
	done: false
});
const tGen = (id, tid, opts1, opts2) => Map({id, tid, tmp: tProto.merge(Map(opts1 || {})), data: tProto.merge(Map(opts2 || opts1 || {}))});
const clean_newt = tGen('new', '', {summ: '', desc: '', date: '', time: '', done: false});

const ttProto = Map({
	summ: 'A task template',
	desc: 'A task template with a description',
	n: 5,
	months: List([0, 2, 3, 6, 10]),
	weeks: List([1, 4]),
	days: List([4, 12, 17, 27]),
	time: '13:45',
	start: '2007-08-23',
	end: '2999-12-31'
});
const ttGen = (id, cnt, opts1, opts2) => Map({id, cnt, tmp: ttProto.merge(Map(opts1 || {})), data: ttProto.merge(Map(opts2 || opts1 || {}))});
const clean_newtt = ttGen('new', 0, {summ: '', desc: '', n: 0, months: List(), weeks: List(), days: List(), time: '', start: '', end: ''});

const S = (items, templates, lastUpdate = '2018-01-01') => Map({lastUpdate, items: List(items || []), templates: List(templates || [])});

describe('Discarding tasks', () => {
	let changedtask = tGen('abc', '', {summ: 'summary', desc: 'description', date: 'today', time: '12:23', done: false}, {summ: 'kdkdk', desc: 'hgh', date: '2014-12-23', time: '13:43', done: true});
	let discardedtask = tGen('abc', '', {summ: 'kdkdk', desc: 'hgh', date: '2014-12-23', time: '13:43', done: true});
	let unchangedtask = tGen('hjk', '', {summ: 'something', desc: 'hello', date: '2018-01-01', time: '12:34', done: true});
	it('does reset tmp field of task to data field', () => {
		expect(tasks(S([changedtask], []), discardTask('abc'))).toEqual(S([discardedtask], []));
	});
  it('does not alter state, when discarding not altered task', () => {
    expect(tasks(S([unchangedtask], []), discardTask('hjk'))).toEqual(S([unchangedtask], []));
  });
  it('does not alter state, when given id is not found', () => {
    expect(tasks(S([changedtask, unchangedtask, discardedtask], []), discardTask('5'))).toEqual(S([changedtask, unchangedtask, discardedtask], []));
	});
});

describe('Discarding task templates', () => {
	it('does reset tmp field of task to data field', () => {
		let initial = S([], [ttGen('2', 3, {summ: 'a', desc: 'b', n: 100, months: List([1, 2, 3]), weeks: List([1, 2]), days: List([1]), time: 'today', start: '2018-01-30', end: '2018-01-31'}, {})]);
		let final = S([], [ttGen('2', 3, {}, {})]);
		expect(tasks(initial, discardTaskTemplate('2'))).toEqual(final);
	});
	it('does not alter state, when discarding not altered task template', () => {
		let initial = S([], [ttGen('2', 3)]);
		expect(tasks(initial, discardTaskTemplate('1'))).toEqual(initial);
	});
	it('does not alter state, when given id is not found', () => {
		let initial = S([], [ttGen('2', 3)]);
		expect(tasks(initial, discardTaskTemplate('5'))).toEqual(initial);
	});
});

describe('Incrementing task template counter', () => {
	it('increments counter of a task template with valid id', () => {
		let initial = S([], [ttGen('1', 5)]);
		let final = S([], [ttGen('1', 6)]);
		expect(tasks(initial, incrementTaskTemplateCounter('1'))).toEqual(final);
	});
	it('does no alter state, when given id is not found', () => {
		let initial = S([], [ttGen('1', 5)]);
		let final = S([], [ttGen('1', 6)]);
		expect(tasks(initial, incrementTaskTemplateCounter('5'))).toEqual(initial);
	})
});

describe('Removing tasks', () => {
	let new_t_clean = getTask('new');
	let new_tt_clean = getTaskTemplate('new');
	let t = getTask('2', '', 'a', 'b', '2018-05-10', '12:00', false);
	it('removes task with valid id', () => {
		let initial = S([new_t_clean, t], [new_tt_clean]);
		let final = S([new_t_clean], [new_tt_clean]);
		expect(tasks(initial, removeTask('2'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let initial = S([tGen('1', '')], []);
		expect(tasks(initial, removeTask('5'))).toEqual(initial);
	});
	it('discards the task with id "new"', () => {
		let initial = S([tGen('new', '', {summ: 'a', desc: 'b', date: '2018-02-02', time: '12:00', done: true}, {summ: '', desc: '', date: '', time: '', done: false})], []);
		let final = S([clean_newt], []);
		expect(tasks(initial, removeTask('new'))).toEqual(final);
	});
});

describe('Removing task templates', () => {
	let new_t_clean = getTask('new');
	let new_tt_clean = getTaskTemplate('new');
	let tt = getTaskTemplate('1', 'a', 'b', 10, 5, List([4]), List(), List([1, 2, 3]), '12:00', '2010-01-01', '2020-01-01');
	let tt_child = getTask('2', '1', 'a', 'b', '2018-05-10', '12:00', false);
	it('removes task template with valid id and all its childs', () => {
		let initial = S([new_t_clean, tt_child], [new_tt_clean, tt]);
		let final = S([new_t_clean], [new_tt_clean]);
		expect(tasks(initial, removeTaskTemplate('1'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let initial = S([], [ttGen('1', 4)]);
		expect(tasks(initial, removeTaskTemplate('5'))).toEqual(initial);
	});
	it('discards the task template with id "new"', () => {
		let initial = S([], [ttGen('new', 0, {summ: 'a', desc: 'b', n: 4, months: List([1, 2, 3]), weeks: List([1, 2]), days: List([1]), time: '13:00', start: '2018-01-01', end: '2999-12-31'}, {summ: '', desc: '', n: 0, months: List(), weeks: List(), days: List(), time: '', start: '', end: ''})]);
		let final = S([], [clean_newtt]);
		expect(tasks(initial, removeTaskTemplate('new'))).toEqual(final);
	});
});

describe('Reset task template counter', () => {
	it('resets the counter of a task template with valid id', () => {
		let initial = S([], [ttGen('2', 4)]);
		let final = S([], [ttGen('2', 0)]);
		expect(tasks(initial, resetTaskTemplateCounter('2'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let initial = S([], [ttGen('2', 4)]);
		expect(tasks(initial, resetTaskTemplateCounter('5'))).toEqual(initial);
	});
});

describe('Saving tasks', () => {
	let new_t_clean = getTask('new');
	let new_t_modified = getTask('new').set('tmp', Map({summ: 'a', desc: 'b', date: '2018-01-01', time: '12:00', done: false}));
	let new_t_saved = getTask('42', '', 'a', 'b', '2018-01-01', '12:00', false);
	let random_t_modified = getTask('2').set('tmp', Map({summ: 'a', desc: 'b', date: '2018-12-31', time: '14:02', done: false}));
	let random_t_saved = getTask('2', '', 'a', 'b', '2018-12-31', '14:02', false);
	it('saves a task with valid id', () => {
		let initial = S([new_t_clean, random_t_modified], []);
		let final = S([new_t_clean, random_t_saved], []);
		expect(tasks(initial, saveTask('2', () => '42'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let initial = S([new_t_modified, random_t_modified], []);
		expect(tasks(initial, saveTask('5', () => '42'))).toEqual(initial);
	});
	it('inserts a new task, when task with id "new" is saved', () => {
		let initial = S([new_t_modified], []);
		let final = S([new_t_clean, new_t_saved]);
		expect(tasks(initial, saveTask('new', () => '42'))).toEqual(final);
	});
});

describe('Saving task templates', () => {
	let new_t_clean = getTask('new');
	let new_tt_clean = getTaskTemplate('new');
	let new_tt_modified = getTaskTemplate('new').set('tmp', Map({summ: 'a', desc: 'b', n: 4, months: List([1, 2, 3]), weeks: List([1, 2]), days: List([1]), time: '12:00', start: '2000-01-01', end: '2999-12-31'}));
	let new_tt_saved = getTaskTemplate('42', 'a', 'b', 4, 0, List([1, 2, 3]), List([1, 2]), List([1]), '12:00', '2000-01-01', '2999-12-31');
	let tt_soft_modified = getTaskTemplate('3', 'a', 'b', 10, 5, List([3, 4]), List(), List([4]), '12:00', '2010-01-01', '2019-01-01').setIn(['tmp', 'summ'], 'c').setIn(['tmp', 'desc'], 'd').setIn(['tmp', 'time'], '22:00').setIn(['tmp', 'days'], List([4, 6, 8]));
	let tt_soft_saved = getTaskTemplate('3', 'c', 'd', 10, 5, List([3, 4]), List(), List([4, 6, 8]), '22:00', '2010-01-01', '2019-01-01');
	let tt_soft_child_1 = getTask('100', '3', 'a', 'b', '2018-04-04', '12:00', false);
	let tt_soft_child_1_modified = getTask('100', '3', 'c', 'd', '2018-04-04', '22:00', false);
	let tt_soft_new = getTaskTemplate('new').set('tmp', Map({summ: 'c', desc: 'd', n: 10, months: List([3, 4]), weeks: List(), days: List([4, 6, 8]), time: '22:00', start: '2010-01-01', end: '2019-01-01'}));
	let tt_ctt_modified = getTaskTemplate('2', 'a', 'b', 10, 5, List([3, 4]), List(), List([4]), '12:00', '2010-01-01', '2019-01-01').setIn(['tmp', 'summ'], 'c').setIn(['tmp', 'desc'], 'd').setIn(['tmp', 'time'], '22:00').setIn(['tmp', 'days'], List([4, 6, 8, 10])).setIn(['tmp', 'months'], List([3, 4, 5]));
	let tt_ctt_saved = getTaskTemplate('2', 'c', 'd', 10, 6, List([3, 4, 5]), List(), List([4, 6, 8, 10]), '22:00', '2010-01-01', '2019-01-01');
	let tt_ctt_child_1 = getTask('99', '2', 'a', 'b', '2018-04-04', '12:00', false);
	let tt_ctt_new_child_today = getTask('100', '2', 'c', 'd', '2018-05-10', '22:00', false);
	let tt_ctt_new = getTaskTemplate('new').set('tmp', Map({summ: 'c', desc: 'd', n: 10, months: List([3, 4, 5]), weeks: List(), days: List([4, 6, 8, 10]), time: '22:00', start: '2010-01-01', end: '2019-01-01'}));
	it('saves modifications of data, does not create a child today without match', () => {
		let initial = S([new_t_clean, tt_soft_child_1], [new_tt_clean, tt_soft_modified]);
		let final = S([new_t_clean, tt_soft_child_1_modified], [new_tt_clean, tt_soft_saved]);
		expect(tasks(initial, saveTaskTemplate('3', moment('2018-05-10'), mockfn))).toEqual(final);
	});
	it('saves modifications of data, creates a child today on match', () => {
		let initial = S([new_t_clean, tt_ctt_child_1], [new_tt_clean, tt_ctt_modified]);
		let final = S([new_t_clean, tt_ctt_new_child_today], [new_tt_clean, tt_ctt_saved]);
		expect(tasks(initial, saveTaskTemplate('2', moment('2018-05-10'), mockfn))).toEqual(final);
	});
	it('inserts a new task template on saving "new", creates a child today on match', () => {
		let initial = S([], [tt_ctt_new]);
		let final = S([tt_ctt_new_child_today.set('tid', '101').set('id', '102')], [new_tt_clean, tt_ctt_saved.set('id', '101').set('cnt', 1)]);
		expect(tasks(initial, saveTaskTemplate('new', moment('2018-05-10'), mockfn))).toEqual(final);
	});
	it('inserts a new task template on saving "new", does not create a child today without match', () => {
		let initial = S([new_t_clean], [tt_soft_new]);
		let final = S([new_t_clean], [new_tt_clean, tt_soft_saved.set('cnt', 0).set('id', '200')]);
		expect(tasks(initial, saveTaskTemplate('new', moment('2018-05-10'), () => '200'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let initial = S([new_t_clean, tt_ctt_child_1], [tt_soft_new, tt_ctt_modified]);
		expect(tasks(initial, saveTaskTemplate('1001', moment('2018-05-10'), mockfn))).toEqual(initial);
	});
});

describe('Toggling tasks done', () => {
	let new_t_clean = getTask('new');
	let random_t = getTask('2', '', 'a', 'b', '2018-12-31', '14:02', false);
	let random_t_toggled = getTask('2', '', 'a', 'b', '2018-12-31', '14:02', false).setIn(['tmp', 'done'], true);
	it('toggles a task with valid id', () => {
		let initial = S([new_t_clean, random_t], []);
		let final = S([new_t_clean, random_t_toggled], []);
		expect(tasks(initial, toggleTaskDone('2'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let initial = S([new_t_clean, random_t], []);
		expect(tasks(initial, toggleTaskDone('5'))).toEqual(initial);
	});
});

describe('Toggling task template days', () => {
	let new_tt_clean = getTaskTemplate('new');
	let random_tt = getTaskTemplate('2', 'a', 'b', 2, 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
	let random_tt_single_removed = random_tt.setIn(['tmp', 'days'], List([5, 6]));
	let random_tt_single_added = random_tt.setIn(['tmp', 'days'], List([5, 6, 7, 1]));
	let random_tt_all_toggled = random_tt.setIn(['tmp', 'days'], List(range(1, 8)));
	let tt_empty_mw = getTaskTemplate('3', 'a', 'b', 5, 10, List(), List(), List([1, 10, 100]), '12:00', '2010-01-01', '2012-01-01');
	let tt_empty_mw_all_toggled = tt_empty_mw.setIn(['tmp', 'days'], List(range(1, 367)));
	let tt_empty_w = getTaskTemplate('3', 'a', 'b', 5, 10, List([4, 5, 6]), List(), List([1, 2, 3]), '12:00', '2010-01-01', '2012-01-01');
	let tt_empty_w_all_toggled = tt_empty_w.setIn(['tmp', 'days'], List(range(1, 32)));
	let tt_full_year = getTaskTemplate('7', 'a', 'b', 10, 20, List(), List(), List(range(1, 367)), '12:00', '2010-01-01', '2110-01-01');
	let tt_full_month = getTaskTemplate('8', 'a', 'b', 10, 20, List([5]), List(), List(range(1, 32)), '12:00', '2010-01-01', '2110-01-01');
	let tt_full_week = getTaskTemplate('9', 'a', 'b', 10, 20, List([5]), List([2]), List(range(1, 8)), '12:00', '2010-01-01', '2110-01-01');
	let tt_full_year_all_toggled = tt_full_year.setIn(['tmp', 'days'], List());
	let tt_full_month_all_toggled = tt_full_month.setIn(['tmp', 'days'], List());
	let tt_full_week_all_toggled = tt_full_week.setIn(['tmp', 'days'], List());
	it('removes a single set day on a task with valid id', () => {
		let initial = S([], [new_tt_clean, random_tt]);
		let final = S([], [new_tt_clean, random_tt_single_removed]);
		expect(tasks(initial, toggleTaskTemplateDay('2', 7))).toEqual(final);
	});
	it('does not remove anything, when given id is not found', () => {
		let initial = S([], [new_tt_clean, random_tt]);
		expect(tasks(initial, toggleTaskTemplateDay('5', 7))).toEqual(initial);
	});
	it('adds a single non-set day on a task with valid id', () => {
		let initial = S([], [new_tt_clean, random_tt]);
		let final = S([], [new_tt_clean, random_tt_single_added]);
		expect(tasks(initial, toggleTaskTemplateDay('2', 1))).toEqual(final);
	});
	it('does not add anything, when given id is not found', () => {
		let initial = S([], [new_tt_clean, random_tt]);
		expect(tasks(initial, toggleTaskTemplateDay('5', 1))).toEqual(initial);
	});
	it('inserts all days of year on non-full list, if weeks and months lists are empty', () => {
		let initial = S([], [new_tt_clean, tt_empty_mw]);
		let final = S([], [new_tt_clean, tt_empty_mw_all_toggled]);
		expect(tasks(initial, toggleTaskTemplateDay('3', 'all'))).toEqual(final);
	});
	it('inserts all days of month on non-full list, if weeks list is empty, but not months list', () => {
		let initial = S([], [new_tt_clean, tt_empty_w]);
		let final = S([], [new_tt_clean, tt_empty_w_all_toggled]);
		expect(tasks(initial, toggleTaskTemplateDay('3', 'all'))).toEqual(final);
	});
	it('inserts all days of week on non-full list, if weeks list is not empty', () => {
		let initial = S([], [new_tt_clean, random_tt]);
		let final = S([], [new_tt_clean, random_tt_all_toggled]);
		expect(tasks(initial, toggleTaskTemplateDay('2', 'all'))).toEqual(final);
	});
	it('clears all days of year on full list, if weeks and months lists are empty', () => {
		let initial = S([], [new_tt_clean, tt_full_year]);
		let final = S([], [new_tt_clean, tt_full_year_all_toggled]);
		expect(tasks(initial, toggleTaskTemplateDay('7', 'all'))).toEqual(final);
	});
	it('clears all days of month on full list, if weeks list is empty, but not months list', () => {
		let initial = S([], [new_tt_clean, tt_full_month]);
		let final = S([], [new_tt_clean, tt_full_month_all_toggled]);
		expect(tasks(initial, toggleTaskTemplateDay('8', 'all'))).toEqual(final);
	});
	it('clears all days of week on full list, if weeks list is not empty', () => {
		let initial = S([], [new_tt_clean, tt_full_week]);
		let final = S([], [new_tt_clean, tt_full_week_all_toggled]);
		expect(tasks(initial, toggleTaskTemplateDay('9', 'all'))).toEqual(final);
	});
	it('does not change list on full toggle, when given id is not found', () => {
		let initial = S([], [new_tt_clean, tt_full_week]);
		expect(tasks(initial, toggleTaskTemplateDay('5', 'all'))).toEqual(initial);
	});
});

describe('Toggling task template weeks', () => {
	let new_tt_clean = getTaskTemplate('new');
	let random_tt = getTaskTemplate('2', 'a', 'b', 2, 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
	let random_tt_single_removed = random_tt.setIn(['tmp', 'weeks'], List([1, 3]));
	let random_tt_single_added = random_tt.setIn(['tmp', 'weeks'], List([1, 2, 3, 5]));
	let random_tt_all_toggled = random_tt.setIn(['tmp', 'weeks'], List(range(1, 6)));
	let tt_empty = getTaskTemplate('4', 'a', 'b', 5, 10, List(), List(), List([1, 10, 100]), '12:00', '2010-01-01', '2012-01-01');
	let tt_empty_single_added = tt_empty.setIn(['tmp', 'weeks'], List([4])).setIn(['tmp', 'days'], List());
	let tt_single = getTaskTemplate('4', 'a', 'b', 5, 10, List(), List([4]), List([1, 2, 3]), '12:00', '2010-01-01', '2012-01-01');
	let tt_single_single_removed = tt_single.setIn(['tmp', 'weeks'], List()).setIn(['tmp', 'days'], List());
	let tt_empty_m = getTaskTemplate('3', 'a', 'b', 5, 10, List(), List([2, 4]), List([1, 10, 100]), '12:00', '2010-01-01', '2012-01-01');
	let tt_empty_m_all_toggled = tt_empty_m.setIn(['tmp', 'weeks'], List(range(1, 54)));
	let tt_full_year = getTaskTemplate('7', 'a', 'b', 10, 20, List(), List(range(1, 54)), List([1]), '12:00', '2010-01-01', '2110-01-01');
	let tt_full_month = getTaskTemplate('8', 'a', 'b', 10, 20, List([5]), List(range(1, 6)), List([1]), '12:00', '2010-01-01', '2110-01-01');
	let tt_full_year_all_toggled = tt_full_year.setIn(['tmp', 'weeks'], List()).setIn(['tmp', 'days'], List());
	let tt_full_month_all_toggled = tt_full_month.setIn(['tmp', 'weeks'], List()).setIn(['tmp', 'days'], List());
	it('removes a single set week on a task with valid id', () => {
		let initial = S([], [new_tt_clean, random_tt]);
		let final = S([], [new_tt_clean, random_tt_single_removed]);
		expect(tasks(initial, toggleTaskTemplateWeek('2', 2))).toEqual(final);
	});
	it('does not remove anything, when given id is not found', () => {
		let initial = S([], [new_tt_clean, random_tt]);
		expect(tasks(initial, toggleTaskTemplateWeek('5', 2))).toEqual(initial);
	});
	it('adds a single non-set week on a task with valid id', () => {
		let initial = S([], [new_tt_clean, random_tt]);
		let final = S([], [new_tt_clean, random_tt_single_added]);
		expect(tasks(initial, toggleTaskTemplateWeek('2', 5))).toEqual(final);
	});
	it('does not add anything, when given id is not found', () => {
		let initial = S([], [new_tt_clean, random_tt]);
		expect(tasks(initial, toggleTaskTemplateWeek('5', 5))).toEqual(initial);
	});
	it('clears days, when weeks was empty before', () => {
		let initial = S([], [new_tt_clean, tt_empty]);
		let final = S([], [new_tt_clean, tt_empty_single_added]);
		expect(tasks(initial, toggleTaskTemplateWeek('4', 4))).toEqual(final);
	});
	it('clears days, when weeks is empty afterwards', () => {
		let initial = S([], [new_tt_clean, tt_single]);
		let final = S([], [new_tt_clean, tt_single_single_removed]);
		expect(tasks(initial, toggleTaskTemplateWeek('4', 4))).toEqual(final);
	});
	it('inserts all weeks of year on non-full list, if months list is empty', () => {
		let initial = S([], [new_tt_clean, tt_empty_m]);
		let final = S([], [new_tt_clean, tt_empty_m_all_toggled]);
		expect(tasks(initial, toggleTaskTemplateWeek('3', 'all'))).toEqual(final);
	});
	it('inserts all weeks of month on non-full list, if months list is not empty', () => {
		let initial = S([], [new_tt_clean, random_tt]);
		let final = S([], [new_tt_clean, random_tt_all_toggled]);
		expect(tasks(initial, toggleTaskTemplateWeek('2', 'all'))).toEqual(final);
	});
	it('clears all weeks of year on full list, if month list is empty', () => {
		let initial = S([], [new_tt_clean, tt_full_year]);
		let final = S([], [new_tt_clean, tt_full_year_all_toggled]);
		expect(tasks(initial, toggleTaskTemplateWeek('7', 'all'))).toEqual(final);
	});
	it('clears all weeks of month on full list, if month list is not empty', () => {
		let initial = S([], [new_tt_clean, tt_full_month]);
		let final = S([], [new_tt_clean, tt_full_month_all_toggled]);
		expect(tasks(initial, toggleTaskTemplateWeek('8', 'all'))).toEqual(final);
	});
	it('does not change list on full toggle, when given id is not found', () => {
		let initial = S([], [new_tt_clean, tt_full_month]);
		expect(tasks(initial, toggleTaskTemplateWeek('5', 'all'))).toEqual(initial);
	});
});

describe('Toggling task template months', () => {
	let new_tt_clean = getTaskTemplate('new');
	let random_tt = getTaskTemplate('2', 'a', 'b', 2, 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
	let random_tt_single_removed = random_tt.setIn(['tmp', 'months'], List([4, 8]));
	let random_tt_single_added = random_tt.setIn(['tmp', 'months'], List([4, 6, 8, 10]));
	let random_tt_all_toggled = random_tt.setIn(['tmp', 'months'], List(range(0, 12)));
	let tt_empty = getTaskTemplate('4', 'a', 'b', 5, 10, List(), List([2, 4]), List([1, 6]), '12:00', '2010-01-01', '2012-01-01');
	let tt_empty_single_added = tt_empty.setIn(['tmp', 'months'], List([4])).setIn(['tmp', 'weeks'], List()).setIn(['tmp', 'days'], List());
	let tt_single = getTaskTemplate('4', 'a', 'b', 5, 10, List([4]), List([3, 5]), List([1, 2, 3]), '12:00', '2010-01-01', '2012-01-01');
	let tt_single_single_removed = tt_single.setIn(['tmp', 'months'], List()).setIn(['tmp', 'weeks'], List()).setIn(['tmp', 'days'], List());
	let tt_full_year = getTaskTemplate('7', 'a', 'b', 10, 20, List(range(0, 12)), List([2]), List([1]), '12:00', '2010-01-01', '2110-01-01');
	let tt_full_year_all_toggled = tt_full_year.setIn(['tmp', 'months'], List()).setIn(['tmp', 'weeks'], List()).setIn(['tmp', 'days'], List());
	it('removes a single set month on a task with valid id', () => {
		let initial = S([], [new_tt_clean, random_tt]);
		let final = S([], [new_tt_clean, random_tt_single_removed]);
		expect(tasks(initial, toggleTaskTemplateMonth('2', 6))).toEqual(final);
	});
	it('does not remove anything, when given id is not found', () => {
		let initial = S([], [new_tt_clean, random_tt]);
		expect(tasks(initial, toggleTaskTemplateMonth('5', 6))).toEqual(initial);
	});
	it('adds a single non-set month on a task with valid id', () => {
		let initial = S([], [new_tt_clean, random_tt]);
		let final = S([], [new_tt_clean, random_tt_single_added]);
		expect(tasks(initial, toggleTaskTemplateMonth('2', 10))).toEqual(final);
	});
	it('does not add anything, when given id is not found', () => {
		let initial = S([], [new_tt_clean, random_tt]);
		expect(tasks(initial, toggleTaskTemplateMonth('5', 10))).toEqual(initial);
	});
	it('clears days and weeks, when months was empty before', () => {
		let initial = S([], [new_tt_clean, tt_empty]);
		let final = S([], [new_tt_clean, tt_empty_single_added]);
		expect(tasks(initial, toggleTaskTemplateMonth('4', 4))).toEqual(final);
	});
	it('clears days and weeks, when months is empty afterwards', () => {
		let initial = S([], [new_tt_clean, tt_single]);
		let final = S([], [new_tt_clean, tt_single_single_removed]);
		expect(tasks(initial, toggleTaskTemplateMonth('4', 4))).toEqual(final);
	});
	it('inserts all months of year on non-full list', () => {
		let initial = S([], [new_tt_clean, random_tt]);
		let final = S([], [new_tt_clean, random_tt_all_toggled]);
		expect(tasks(initial, toggleTaskTemplateMonth('2', 'all'))).toEqual(final);
	});
	it('clears all months of year on full list', () => {
		let initial = S([], [new_tt_clean, tt_full_year]);
		let final = S([], [new_tt_clean, tt_full_year_all_toggled]);
		expect(tasks(initial, toggleTaskTemplateMonth('7', 'all'))).toEqual(final);
	});
	it('does not change list on full toggle, when given id is not found', () => {
		let initial = S([], [new_tt_clean, tt_full_year]);
		expect(tasks(initial, toggleTaskTemplateMonth('5', 'all'))).toEqual(initial);
	});
});

describe('Updating task date', () => {
	let new_t_clean = getTask('new');
	let t = getTask('3', '', 'a', 'b', '2018-05-15', '14:00', false);
	let updated = t.setIn(['tmp', 'date'], '2019-01-01');
	it('updates task date on a task with valid id', () => {
		let initial = S([new_t_clean, t], []);
		let final = S([new_t_clean, updated], []);
		expect(tasks(initial, updateTaskDate('3', '2019-01-01'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let initial = S([new_t_clean, t], []);
		expect(tasks(initial, updateTaskDate('5', '2019-01-01'))).toEqual(initial);
	});
});

describe('Updating task description', () => {
	let new_t_clean = getTask('new');
	let t = getTask('3', '', 'a', 'b', '2018-05-15', '14:00', false);
	let updated = t.setIn(['tmp', 'desc'], 'desc');
	it('updates task description on a task with valid id', () => {
		let initial = S([new_t_clean, t], []);
		let final = S([new_t_clean, updated], []);
		expect(tasks(initial, updateTaskDescription('3', 'desc'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let initial = S([new_t_clean, t], []);
		expect(tasks(initial, updateTaskDescription('5', 'desc'))).toEqual(initial);
	});
});

describe('Updating task template description', () => {
	let new_tt_clean = getTaskTemplate('new');
	let tt = getTaskTemplate('3', 'a', 'b', 5, 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
	let updated = tt.setIn(['tmp', 'desc'], 'desc');
	it('updates task template description on a task template with valid id', () => {
		let initial = S([], [new_tt_clean, tt]);
		let final = S([], [new_tt_clean, updated]);
		expect(tasks(initial, updateTaskTemplateDescription('3', 'desc'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let initial = S([], [new_tt_clean, tt]);
		expect(tasks(initial, updateTaskTemplateDescription('5', 'desc'))).toEqual(initial);
	});
});

describe('Updating task template end', () => {
	let new_tt_clean = getTaskTemplate('new');
	let tt = getTaskTemplate('3', 'a', 'b', 5, 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
	let updated = tt.setIn(['tmp', 'end'], '2020-01-01');
	it('updates task template end on a task template with valid id', () => {
		let initial = S([], [new_tt_clean, tt]);
		let final = S([], [new_tt_clean, updated]);
		expect(tasks(initial, updateTaskTemplateEnd('3', '2020-01-01'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let initial = S([], [new_tt_clean, tt]);
		expect(tasks(initial, updateTaskTemplateEnd('5', '2020-01-01'))).toEqual(initial);
	});
});

describe('Updating task template n', () => {
	let new_tt_clean = getTaskTemplate('new');
	let tt = getTaskTemplate('3', 'a', 'b', 5, 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
	let updated = tt.setIn(['tmp', 'n'], 10);
	it('updates task template n on a task template with valid id', () => {
		let initial = S([], [new_tt_clean, tt]);
		let final = S([], [new_tt_clean, updated]);
		expect(tasks(initial, updateTaskTemplateN('3', 10))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let initial = S([], [new_tt_clean, tt]);
		expect(tasks(initial, updateTaskTemplateN('5', 10))).toEqual(initial);
	});
});

describe('Updating task summary', () => {
	let new_t_clean = getTask('new');
	let t = getTask('3', '', 'a', 'b', '2018-05-15', '14:00', false);
	let updated = t.setIn(['tmp', 'summ'], 'summ');
	it('updates task summary on a task with valid id', () => {
		let initial = S([new_t_clean, t], []);
		let final = S([new_t_clean, updated], []);
		expect(tasks(initial, updateTaskSummary('3', 'summ'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let initial = S([new_t_clean, t], []);
		expect(tasks(initial, updateTaskSummary('5', 'summ'))).toEqual(initial);
	});
});

describe('Updating task template summary', () => {
	let new_tt_clean = getTaskTemplate('new');
	let tt = getTaskTemplate('3', 'a', 'b', 5, 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
	let updated = tt.setIn(['tmp', 'summ'], 'summ');
	it('updates task template summary on a task template with valid id', () => {
		let initial = S([], [new_tt_clean, tt]);
		let final = S([], [new_tt_clean, updated]);
		expect(tasks(initial, updateTaskTemplateSummary('3', 'summ'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let initial = S([], [new_tt_clean, tt]);
		expect(tasks(initial, updateTaskTemplateSummary('5', 'summ'))).toEqual(initial);
	});
});

describe('Updating task template start', () => {
	let new_tt_clean = getTaskTemplate('new');
	let tt = getTaskTemplate('3', 'a', 'b', 5, 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
	let updated = tt.setIn(['tmp', 'start'], '2000-01-01');
	it('updates task template start on a task template with valid id', () => {
		let initial = S([], [new_tt_clean, tt]);
		let final = S([], [new_tt_clean, updated]);
		expect(tasks(initial, updateTaskTemplateStart('3', '2000-01-01'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let initial = S([], [new_tt_clean, tt]);
		expect(tasks(initial, updateTaskTemplateStart('5', '2000-01-01'))).toEqual(initial);
	});
});

describe('Updating task time', () => {
	let new_t_clean = getTask('new');
	let t = getTask('3', '', 'a', 'b', '2018-05-15', '14:00', false);
	let updated = t.setIn(['tmp', 'time'], '18:00');
	it('updates task time on a task with valid id', () => {
		let initial = S([new_t_clean, t], []);
		let final = S([new_t_clean, updated], []);
		expect(tasks(initial, updateTaskTime('3', '18:00'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let initial = S([new_t_clean, t], []);
		expect(tasks(initial, updateTaskTime('5', '18:00'))).toEqual(initial);
	});
});

describe('Updating task template time', () => {
	let new_tt_clean = getTaskTemplate('new');
	let tt = getTaskTemplate('3', 'a', 'b', 5, 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
	let updated = tt.setIn(['tmp', 'time'], '18:00');
	it('updates task template time on a task template with valid id', () => {
		let initial = S([], [new_tt_clean, tt]);
		let final = S([], [new_tt_clean, updated]);
		expect(tasks(initial, updateTaskTemplateTime('3', '18:00'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let initial = S([], [new_tt_clean, tt]);
		expect(tasks(initial, updateTaskTemplateTime('5', '18:00'))).toEqual(initial);
	});
});

describe('Updating last update of tasks', () => {
	let new_t_clean = getTask('new');
	let new_tt_clean = getTaskTemplate('new');
	let old_t_done = getTask('4', '', 'old', 'very old', '2018-05-02', '12:00', true);
	let old_t_undone = getTask('4', '', 'old', 'very old', '2018-05-02', '12:00', false);
	let random_t = getTask('5', '', 'tasksumm', 'taskdesc', '2018-05-05', '12:00', false);
	let old_tt = getTaskTemplate('16', 'old', 'old task (template)', 8, 4, List(), List(), List(), '12:00', '2018-01-01', '2018-04-05');
	let old_tt_child_undone = getTask('88', '16', 'old', 'old task (template)', '2018-04-01', '12:00', false);
	let full_tt = getTaskTemplate('17', 'full', 'full task (template)', 8, 8, List(), List(), List(), '12:00', '2018-01-01', '2019-05-05');
	let full_tt_child_undone = getTask('88', '17', 'full', 'full task (template)', '2018-04-01', '12:00', false);
	let tt_overflow = getTaskTemplate('22', 'everyday', 'task at every day', 5, 2, List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), List([1, 2, 3, 4, 5]), List([1, 2, 3, 4, 5, 6, 7]), '12:30', '2018-01-01', '2019-01-01');
	let tt_ending = getTaskTemplate('22', 'everyday', 'task at every day', 100, 2, List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), List([1, 2, 3, 4, 5]), List([1, 2, 3, 4, 5, 6, 7]), '12:30', '2018-01-01', '2018-05-03');
	let tt_child_1 = getTask('42', '22', 'everyday', 'task at every day', '2018-05-02', '12:30', false);
	let tt_child_2 = getTask('42', '22', 'everyday', 'task at every day', '2018-05-03', '12:30', false);
	let tt_child_3 = getTask('42', '22', 'everyday', 'task at every day', '2018-05-04', '12:30', false);
	let tt_good = getTaskTemplate('66', 'good', 'good task template', 100, 2, List([1]), List([1]), List([1]), '12:00', '2000-01-01', '2020-01-01');
	it('removes old done tasks', () => {
		let initial = S([new_t_clean, old_t_done], [new_tt_clean], '2018-05-01');
		let final = S([new_t_clean], [new_tt_clean], '2018-05-10');
		expect(tasks(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('keeps old undone tasks', () => {
		let initial = S([new_t_clean, old_t_undone], [new_tt_clean], '2018-05-01');
		let final = S([new_t_clean, old_t_undone], [new_tt_clean], '2018-05-10');
		expect(tasks(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('removes old task templates, which have no childs', () => {
		let initial = S([new_t_clean], [new_tt_clean, old_tt], '2018-05-01');
		let final = S([new_t_clean], [new_tt_clean], '2018-05-10');
		expect(tasks(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('keeps old task templates, which still have undone childs', () => {
		let initial = S([new_t_clean, old_tt_child_undone], [new_tt_clean, old_tt], '2018-05-01');
		let final = S([new_t_clean, old_tt_child_undone], [new_tt_clean, old_tt], '2018-05-10');
		expect(tasks(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('removes full task templates, which have no childs', () => {
		let initial = S([new_t_clean], [new_tt_clean, full_tt], '2018-05-01');
		let final = S([new_t_clean], [new_tt_clean], '2018-05-10');
		expect(tasks(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('keeps full task templates, which still have undone childs', () => {
		let initial = S([new_t_clean, full_tt_child_undone], [new_tt_clean, full_tt], '2018-05-01');
		let final = S([new_t_clean, full_tt_child_undone], [new_tt_clean, full_tt], '2018-05-10');
		expect(tasks(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('keeps task templates, which are neither full nor old', () => {
		let initial = S([new_t_clean], [new_tt_clean, tt_good], '2018-05-01');
		let final = S([new_t_clean], [new_tt_clean, tt_good], '2018-05-10');
		expect(tasks(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('adds latest template child, if counter of template is not full', () => {
		let initial = S([new_t_clean], [new_tt_clean, tt_overflow], '2018-05-01');
		let final = S([new_t_clean, tt_child_3], [new_tt_clean, tt_overflow.set('cnt', 5)], '2018-05-10');
		expect(tasks(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('adds latest template childs, if end is not reached', () => {
		let initial = S([new_t_clean], [new_tt_clean, tt_ending], '2018-05-01');
		let final = S([new_t_clean, tt_child_2], [new_tt_clean, tt_ending.set('cnt', 4)], '2018-05-10');
		expect(tasks(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('updates last update to today', () => {
		let initial = S([], [], '2000-01-01');
		let final = S([], [], '2018-05-10');
		expect(tasks(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
});