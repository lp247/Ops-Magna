jest.unmock('immutable');

import {Map, List} from 'immutable';
import tasks from './tasks.reducer';
import {discardTask, removeTask, discardTaskTemplate, incrementTaskTemplateCounter, removeTaskTemplate, resetTaskTemplateCounter, saveTask, saveTaskTemplate, toggleTaskDone, toggleTaskTemplateDay, toggleTaskTemplateWeek, toggleTaskTemplateMonth, updateTaskDate, updateTaskDescription, updateTaskTemplateDescription, updateTaskTemplateEnd, updateTaskTemplateN, updateTaskSummary, updateTaskTemplateSummary, updateTaskTemplateStart, updateTaskTime, updateTaskTemplateTime} from '../actions/tasks.actions';
import {getTask, getTaskTemplate} from '../../utils/objects';
import {updateDate} from '../actions/date.actions';

const range = (start, end) => {
  return Array(end - start).fill().map((_, idx) => start + idx);
}

const TD = (summ, desc, date, time, done) => Map({summ, desc, date, time, done});
const T = (id, tid, ed) => Map({id, tid, tmp: ed, data: ed});
const T_ = (id, tid, td1, td2) => Map({id, tid,	tmp: td1, data: td2});
const TTD = (summ, desc, n, months, weeks, days, time, start, end) => Map({summ, desc, n, months, weeks, days, time, start, end});
const TT = (id, cnt, ttd) => Map({id, cnt, tmp: ttd, data: ttd});
const TT_ = (id, cnt, ttd1, ttd2) => Map({id, cnt, tmp: ttd1, data: ttd2});
const S = (items, templates) => Map({items: List(items || []), templates: List(templates || [])});

let NCT = (date) => getTask('new').setIn(['tmp', 'date'], date).setIn(['data', 'date'], date);
let NCTT = getTaskTemplate('new');

describe('Discarding tasks', () => {
	it('does reset tmp field of task to data field', () => {
		let t_data_old = TD('a', 'b', '2015-01-01', '13:00', false);
		let t_data_new = TD('c', 'd', '2018-01-01', '16:00', false);
		let t_old = T_('2', '', t_data_new, t_data_old);
		let t_new = T('2', '', t_data_old);
		let initial = S([NCT('2018-05-01'), t_old], [NCTT]);
		let final = S([NCT('2018-05-01'), t_new], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', discardTask('2'))).toEqual(final);
	});
  it('does not alter state, when discarding not altered task', () => {
    let t_data = TD('a', 'b', '2015-01-01', '13:00', false);
		let t = T('2', '', t_data);
		let initial = S([NCT('2018-05-01')], [NCTT, t]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', discardTask('2'))).toEqual(initial);
  });
  it('does not alter state, when given id is not found', () => {
		let t_data_old = TD('a', 'b', '2015-01-01', '13:00', false);
		let t_data_new = TD('c', 'd', '2018-01-01', '16:00', false);
		let t = T_('2', '', t_data_new, t_data_old);
		let initial = S([NCT('2018-05-01')], [NCTT, t]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', discardTask('5'))).toEqual(initial);
	});
});

describe('Discarding task templates', () => {
	it('does reset tmp field of task to data field', () => {
		let tt_data_old = TTD('a', 'b', 100, List(), List(), List(), '12:00', '2010-01-01', '2020-01-01');
		let tt_data_new = TTD('c', 'd', 12000, List([1]), List([1]), List([1]), '22:00', '2012-01-01', '2019-01-01');
		let tt_old = TT_('2', 3, tt_data_new, tt_data_old);
		let tt_new = TT('2', 3, tt_data_old);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_old]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_new]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', discardTaskTemplate('2'))).toEqual(final);
	});
	it('does not alter state, when discarding not altered task template', () => {
		let tt_data = TTD('a', 'b', 100, List(), List(), List(), '12:00', '2010-01-01', '2020-01-01');
		let tt = TT('2', 3, tt_data);
		let initial = S([NCT('2018-05-01')], [NCTT, tt]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', discardTaskTemplate('2'))).toEqual(initial);
	});
	it('does not alter state, when given id is not found', () => {
		let tt_data_old = TTD('a', 'b', 100, List(), List(), List(), '12:00', '2010-01-01', '2020-01-01');
		let tt_data_new = TTD('c', 'd', 12000, List([1]), List([1]), List([1]), '22:00', '2012-01-01', '2019-01-01');
		let tt_old = TT_('2', 3, tt_data_new, tt_data_old);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_old]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', discardTaskTemplate('5'))).toEqual(initial);
	});
});

describe('Incrementing task template counter', () => {
	it('increments counter of a task template with valid id', () => {
		let tt_data = TTD('a', 'b', 111, List(), List(), List(), '12:00', '2010-01-01', '2020-01-01');
		let tt_old = TT('2', 4, tt_data);
		let tt_new = TT('2', 5, tt_data);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_old]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_new]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', incrementTaskTemplateCounter('2'))).toEqual(final);
	});
	it('does no alter state, when given id is not found', () => {
		let tt_data = TTD('a', 'b', 111, List(), List(), List(), '12:00', '2010-01-01', '2020-01-01');
		let tt_old = TT('2', 4, tt_data);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_old]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', incrementTaskTemplateCounter('5'))).toEqual(initial);
	});
});

describe('Removing tasks', () => {
	it('removes task with valid id', () => {
		let t_data = TD('a', 'b', '2018-05-01', '12:00', false);
		let t = T('2', '', t_data);
		let initial = S([NCT('2018-05-01'), t], [NCTT]);
		let final = S([NCT('2018-05-01')], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', removeTask('2'))).toEqual(final);
	});
	it('discards the task with id "new"', () => {
		let new_t_data = TD('a', 'b', '2018-02-01', '12:00', false);
		let empty_t_data = TD('', '', '2018-05-01', '', false);
		let new_t = T_('new', '', new_t_data, empty_t_data);
		let initial = S([new_t], [NCTT]);
		let final = S([NCT('2018-05-01')], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', removeTask('new'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let t_data = TD('a', 'b', '2018-05-01', '12:00', false);
		let t = T('2', '', t_data);
		let initial = S([NCT('2018-05-01'), t], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', removeTask('5'))).toEqual(initial);
	});
});

describe('Removing task templates', () => {
	it('removes task template with valid id and all its children', () => {
		let tt_data = TTD('a', 'b', 10, List([4]), List(), List([1, 2, 3]), '12:00', '2010-01-01', '2020-01-01');
		let tt = TT('2', 5, tt_data);
		let t_data = TD('a', 'b', '2018-05-01', '12:00', false);
		let t = T('99', '2', t_data);
		let initial = S([NCT('2018-05-01'), t], [NCTT, tt]);
		let final = S([NCT('2018-05-01')], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', removeTaskTemplate('2'))).toEqual(final);
	});
	it('discards the task template with id "new"', () => {
		let new_tt_data = TTD('a', 'b', 10, List([4]), List(), List([1, 2, 3]), '12:00', '2010-01-01', '2020-01-01');
		let empty_tt_data = TTD('', '', -1, List(), List(), List(), '', '', '');
		let new_tt = TT_('new', 0, new_tt_data, empty_tt_data);
		let initial = S([NCT('2018-05-01')], [new_tt]);
		let final = S([NCT('2018-05-01')], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', removeTaskTemplate('new'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let tt_data = TTD('a', 'b', 10, List([4]), List(), List([1, 2, 3]), '12:00', '2010-01-01', '2020-01-01');
		let tt = TT('1', 5, tt_data);
		let t_data = TD('a', 'b', '2018-05-01', '12:00', false);
		let t = T('2', '1', t_data);
		let initial = S([NCT('2018-05-01'), t], [NCTT, tt]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', removeTaskTemplate('5'))).toEqual(initial);
	});
});

describe('Reset task template counter', () => {
	it('resets the counter of a task template with valid id', () => {
		let tt_data = TTD('a', 'b', 10, List([3, 4]), List(), List([4]), '12:00', '2010-01-01', '2019-01-01');
		let tt_old = TT('2', 5, tt_data);
		let tt_new = TT('2', 0, tt_data);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_old]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_new]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', resetTaskTemplateCounter('2'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let tt_data = TTD('a', 'b', 10, List([3, 4]), List(), List([4]), '12:00', '2010-01-01', '2019-01-01');
		let tt_old = TT('10', 5, tt_data);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_old]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', resetTaskTemplateCounter('5'))).toEqual(initial);
	});
});

describe('Saving tasks', () => {
	it('saves a task with valid id', () => {
		let t_data_before = TD('a', 'b', '2018-05-01', '14:00', false);
		let t_data_after = TD('c', 'd', '2018-12-31', '16:02', true);
		let t_before = T_('2', 5, t_data_after, t_data_before);
		let t_after = T('2', 5, t_data_after);
		let initial = S([NCT('2018-05-01'), t_before], [NCTT]);
		let final = S([NCT('2018-05-01'), t_after], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', saveTask('2', () => '42'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let t_data_before = TD('a', 'b', '2018-05-01', '14:00', false);
		let t_data_after = TD('c', 'd', '2018-12-31', '16:02', true);
		let t_before = T('2', 5, t_data_after, t_data_before);
		let initial = S([NCT('2018-05-01'), t_before], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', saveTask('5', () => '42'))).toEqual(initial);
	});
	it('inserts a new task, when task with id "new" is saved', () => {
		let new_t_data = TD('a', 'b', '2018-01-01', '12:00', false);
		let empty_t_data = TD('', '', '2018-05-01', '', false);
		let new_t = T_('new', '', new_t_data, empty_t_data);
		let new_t_saved = T('42', '', new_t_data);
		let initial = S([new_t], [NCTT]);
		let final = S([NCT('2018-05-01'), new_t_saved], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', saveTask('new'), () => '42')).toEqual(final);
	});
});

describe('Saving task templates', () => {
	it('saves modifications of data, does not create a child today without match', () => {
		let tt_old_data = TTD('a', 'b', 10, List([3, 4]), List(), List([4]), '12:00', '2010-01-01', '2019-01-01');
		let tt_new_data = TTD('c', 'd', 10, List([3, 4, 5]), List(), List([4, 6, 8, 10]), '22:00', '2010-01-01', '2019-01-01');
		let tt_modified = TT_('10', 5, tt_new_data, tt_old_data);
		let tt_saved = TT('10', 5, tt_new_data);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_modified]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_saved]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', saveTaskTemplate('10'), () => '42')).toEqual(final);
	});
	it('saves modifications of data, creates a child today on match', () => {
		let tt_old_data = TTD('a', 'b', 10, List([3, 4]), List(), List([4]), '12:00', '2010-01-01', '2019-01-01');
		let tt_new_data = TTD('c', 'd', 10, List([3, 4, 5]), List(), List([1, 4, 6, 8, 10]), '22:00', '2010-01-01', '2019-01-01');
		let tt_modified = TT_('10', 5, tt_new_data, tt_old_data);
		let tt_saved = TT('10', 6, tt_new_data);
		let new_child_data = TD('c', 'd', '2018-05-01', '22:00', false);
		let new_child = T('42', '10', new_child_data);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_modified]);
		let final = S([NCT('2018-05-01'), new_child], [NCTT, tt_saved]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', saveTaskTemplate('10'), () => '42')).toEqual(final);
	});
	it('inserts a new task template on saving "new", creates a child today on match', () => {
		let new_tt_data = TTD('c', 'd', 10, List([3, 4, 5]), List(), List([1, 4, 6, 8]), '22:00', '2010-01-01', '2019-01-01');
		let empty_tt_data = TTD('', '', 0, List(), List(), List(), '', '', '');
		let new_tt = TT_('new', 0, new_tt_data, empty_tt_data);
		let saved_tt = TT('42', 1, new_tt_data);
		let child_data = TD('c', 'd', '2018-05-01', '22:00', false);
		let child = T('42', '42', child_data);
		let initial = S([NCT('2018-05-01')], [new_tt]);
		let final = S([NCT('2018-05-01'), child], [NCTT, saved_tt]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', saveTaskTemplate('new'), () => '42')).toEqual(final);
	});
	it('inserts a new task template on saving "new", does not create a child today without match', () => {
		let new_tt_data = TTD('c', 'd', 10, List([3, 4]), List(), List([4, 6, 8]), '22:00', '2010-01-01', '2019-01-01');
		let empty_tt_data = TTD('', '', 0, List(), List(), List(), '', '', '');
		let new_tt = TT_('new', 0, new_tt_data, empty_tt_data);
		let saved_tt = TT('200', 0, new_tt_data);
		let initial = S([NCT('2018-05-01')], [new_tt]);
		let final = S([NCT('2018-05-01')], [NCTT, saved_tt]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', saveTaskTemplate('new'), () => '200')).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let child_data = TD('a', 'b', '2018-04-04', '12:00', false);
		let child = T('99', '2', child_data);
		let new_tt_data = TTD('c', 'd', 10, List([3, 4]), List(), List([4, 6, 8]), '22:00', '2010-01-01', '2019-01-01');
		let empty_tt_data = TTD('', '', 0, List(), List(), List(), '', '', '');
		let new_tt = TT_('new', 0, new_tt_data, empty_tt_data);
		let modified_tt_data_old = TTD('summ', 'desc', 20, List([3, 4, 5]), List([1, 2]), List(), '12:00', '1999-01-01', '2219-01-01');
		let modified_tt_data_new = TTD('c', 'd', 10, List([3, 4]), List(), List([4]), '22:00', '2010-01-01', '2019-01-01');
		let modified_tt = TT_('2', 5, modified_tt_data_new, modified_tt_data_old);
		let initial = S([NCT('2018-05-01'), child], [new_tt, modified_tt]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', saveTaskTemplate('1001'), () => '42')).toEqual(initial);
	});
});

describe('Toggling tasks done', () => {
	it('toggles a task with valid id', () => {
		let t_data_before = TD('a', 'b', '2018-05-01', '14:00', false);
		let t_data_after = TD('a', 'b', '2018-05-01', '14:00', true);
		let t_before = T('2', 5, t_data_before);
		let t_after = T_('2', 5, t_data_after, t_data_before);
		let initial = S([NCT('2018-05-01'), t_before], [NCTT]);
		let final = S([NCT('2018-05-01'), t_after], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskDone('2'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let t_data_before = TD('a', 'b', '2018-05-01', '14:00', false);
		let t_before = T('3', 5, t_data_before);
		let initial = S([NCT('2018-05-01'), t_before], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskDone('5'))).toEqual(initial);
	});
});

describe('Toggling task template days', () => {
	it('removes a single set day on a task with valid id', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6]), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateDay('2', 7))).toEqual(final);
	});
	it('does not remove anything, when given id is not found', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_before = TT('2', 2, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateDay('5', 7))).toEqual(initial);
	});
	it('adds a single non-set day on a task with valid id', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([1, 5, 6, 7]), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateDay('2', 1))).toEqual(final);
	});
	it('does not add anything, when given id is not found', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_before = TT('2', 2, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateDay('5', 1))).toEqual(initial);
	});
	it('inserts all days of year on non-full list, if weeks and months lists are empty', () => {
		let tt_data_before = TTD('a', 'b', 5, List(), List(), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List(), List(), List(range(1, 367)), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateDay('2', 'all'))).toEqual(final);
	});
	it('inserts all days of month on non-full list, if weeks list is empty, but not months list', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List(), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List([4, 6, 8]), List(), List(range(1, 32)), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateDay('2', 'all'))).toEqual(final);
	});
	it('inserts all days of week on non-full list, if weeks list is not empty', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([1, 2, 3, 4, 5, 6, 7]), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateDay('2', 'all'))).toEqual(final);
	});
	it('clears all days of year on full list, if weeks and months lists are empty', () => {
		let tt_data_before = TTD('a', 'b', 5, List(), List(), List(range(1, 367)), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List(), List(), List(), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateDay('2', 'all'))).toEqual(final);
	});
	it('clears all days of month on full list, if weeks list is empty, but not months list', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List(), List(range(1, 32)), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List([4, 6, 8]), List(), List(), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateDay('2', 'all'))).toEqual(final);
	});
	it('clears all days of week on full list, if weeks list is not empty', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([1, 2, 3, 4, 5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List(), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateDay('2', 'all'))).toEqual(final);
	});
	it('does not change list on full toggle, when given id is not found', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_before = TT('2', 2, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateDay('5', 'all'))).toEqual(initial);
	});
});

describe('Toggling task template weeks', () => {
	it('removes a single set week on a task with valid id', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateWeek('2', 2))).toEqual(final);
	});
	it('does not remove anything, when given id is not found', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_before = TT('2', 2, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateWeek('5', 2))).toEqual(initial);
	});
	it('adds a single non-set week on a task with valid id', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3, 5]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateWeek('2', 5))).toEqual(final);
	});
	it('does not add anything, when given id is not found', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_before = TT('2', 2, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateWeek('5', 5))).toEqual(initial);
	});
	it('clears days, when weeks was empty before', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List(), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List([4, 6, 8]), List([4]), List(), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateWeek('2', 4))).toEqual(final);
	});
	it('clears days, when weeks is empty afterwards', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([4]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List([4, 6, 8]), List(), List(), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateWeek('2', 4))).toEqual(final);
	});
	it('inserts all weeks of year on non-full list, if months list is empty', () => {
		let tt_data_before = TTD('a', 'b', 5, List(), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List(), List(range(1, 54)), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateWeek('2', 'all'))).toEqual(final);
	});
	it('inserts all weeks of month on non-full list, if months list is not empty', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3, 4, 5]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateWeek('2', 'all'))).toEqual(final);
	});
	it('clears all weeks of year on full list, if month list is empty', () => {
		let tt_data_before = TTD('a', 'b', 5, List(), List(range(1, 54)), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List(), List(), List(), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateWeek('2', 'all'))).toEqual(final);
	});
	it('clears all weeks of month on full list, if month list is not empty', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3, 4, 5]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List([4, 6, 8]), List(), List(), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateWeek('2', 'all'))).toEqual(final);
	});
	it('does not change list on full toggle, when given id is not found', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_before = TT('2', 2, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateWeek('5', 'all'))).toEqual(initial);
	});
});

describe('Toggling task template months', () => {
	it('removes a single set month on a task with valid id', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List([4, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateMonth('2', 6))).toEqual(final);
	});
	it('does not remove anything, when given id is not found', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_before = TT('2', 2, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateMonth('5', 6))).toEqual(initial);
	});
	it('adds a single non-set month on a task with valid id', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List([4, 6, 8, 10]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateMonth('2', 10))).toEqual(final);
	});
	it('does not add anything, when given id is not found', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_before = TT('2', 2, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateMonth('5', 10))).toEqual(initial);
	});
	it('clears days and weeks, when months was empty before', () => {
		let tt_data_before = TTD('a', 'b', 5, List(), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List([4]), List(), List(), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateMonth('2', 4))).toEqual(final);
	});
	it('clears days and weeks, when months is empty afterwards', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List(), List(), List(), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateMonth('2', 4))).toEqual(final);
	});
	it('inserts all months of year on non-full list', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateMonth('2', 'all'))).toEqual(final);
	});
	it('clears all months of year on full list (weeks and days cleared as well)', () => {
		let tt_data_before = TTD('a', 'b', 5, List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_data_after = TTD('a', 'b', 5, List(), List(), List(), '12:00', '2010-01-01', '2110-01-01')
		let tt_before = TT('2', 2, tt_data_before);
		let tt_after = TT_('2', 2, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateMonth('2', 'all'))).toEqual(final);
	});
	it('does not change list on full toggle, when given id is not found', () => {
		let tt_data_before = TTD('a', 'b', 5, List([4, 6, 8]), List([1, 2, 3]), List([5, 6, 7]), '12:00', '2010-01-01', '2110-01-01');
		let tt_before = TT('2', 2, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', toggleTaskTemplateMonth('5', 'all'))).toEqual(initial);
	});
});

describe('Updating task date', () => {
	it('updates task date on a task with valid id', () => {
		let t_data_before = TD('a', 'b', '2018-05-01', '14:00', false);
		let t_data_after = TD('a', 'b', '2019-01-01', '14:00', false);
		let t_before = T('3', 5, t_data_before);
		let t_after = T_('3', 5, t_data_after, t_data_before);
		let initial = S([NCT('2018-05-01'), t_before], [NCTT]);
		let final = S([NCT('2018-05-01'), t_after], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskDate('3', '2019-01-01'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let t_data_before = TD('a', 'b', '2018-05-01', '16:00', false);
		let t_before = T('3', 5, t_data_before);
		let initial = S([NCT('2018-05-01'), t_before], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskDate('5', '2019-01-01'))).toEqual(initial);
	});
});

describe('Updating task description', () => {
	it('updates task description on a task with valid id', () => {
		let t_data_before = TD('a', 'b', '2018-05-01', '14:00', false);
		let t_data_after = TD('a', 'desc', '2018-05-01', '14:00', false);
		let t_before = T('3', 5, t_data_before);
		let t_after = T_('3', 5, t_data_after, t_data_before);
		let initial = S([NCT('2018-05-01'), t_before], [NCTT]);
		let final = S([NCT('2018-05-01'), t_after], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskDescription('3', 'desc'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let t_data_before = TD('a', 'b', '2018-05-01', '16:00', false);
		let t_before = T('3', 5, t_data_before);
		let initial = S([NCT('2018-05-01'), t_before], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskDescription('5', 'desc'))).toEqual(initial);
	});
});

describe('Updating task template description', () => {
	it('updates task template description on a task template with valid id', () => {
		let tt_data_before = TTD('a', 'b', 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
		let tt_data_after = TTD('a', 'desc', 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
		let tt_before = TT('3', 5, tt_data_before);
		let tt_after = TT_('3', 5, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskTemplateDescription('3', 'desc'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let tt_data = TTD('a', 'b', 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
		let tt = TT('3', 5, tt_data);
		let initial = S([NCT('2018-05-01')], [NCTT, tt]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskTemplateDescription('5', 'desc'))).toEqual(initial);
	});
});

describe('Updating task template end', () => {
	it('updates task template end on a task template with valid id', () => {
		let tt_data_before = TTD('a', 'b', 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
		let tt_data_after = TTD('a', 'b', 19, List(), List(), List(), '12:00', '2111-01-01', '2020-01-01');
		let tt_before = TT('3', 5, tt_data_before);
		let tt_after = TT_('3', 5, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskTemplateEnd('3', '2020-01-01'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let tt_data = TTD('a', 'b', 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
		let tt = TT('3', 5, tt_data);
		let initial = S([NCT('2018-05-01')], [NCTT, tt]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskTemplateEnd('5', '2020-01-01'))).toEqual(initial);
	});
});

describe('Updating task template n', () => {
	it('updates task template n on a task template with valid id', () => {
		let tt_data_before = TTD('a', 'b', 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
		let tt_data_after = TTD('a', 'b', 10, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
		let tt_before = TT('3', 5, tt_data_before);
		let tt_after = TT_('3', 5, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskTemplateN('3', 10))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let tt_data = TTD('a', 'b', 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
		let tt = TT('3', 5, tt_data);
		let initial = S([NCT('2018-05-01')], [NCTT, tt]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskTemplateN('5', 10))).toEqual(initial);
	});
});

describe('Updating task summary', () => {
	it('updates task summary on a task with valid id', () => {
		let t_data_before = TD('a', 'b', '2018-05-01', '14:00', false);
		let t_data_after = TD('summ', 'b', '2018-05-01', '14:00', false);
		let t_before = T('3', 5, t_data_before);
		let t_after = T_('3', 5, t_data_after, t_data_before);
		let initial = S([NCT('2018-05-01'), t_before], [NCTT]);
		let final = S([NCT('2018-05-01'), t_after], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskSummary('3', 'summ'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let t_data_before = TD('a', 'b', '2018-05-01', '16:00', false);
		let t_before = T('3', 5, t_data_before);
		let initial = S([NCT('2018-05-01'), t_before], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskSummary('5', 'summ'))).toEqual(initial);
	});
});

describe('Updating task template summary', () => {
	it('updates task template summary on a task template with valid id', () => {
		let tt_data_before = TTD('a', 'b', 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
		let tt_data_after = TTD('summ', 'b', 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
		let tt_before = TT('3', 5, tt_data_before);
		let tt_after = TT_('3', 5, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskTemplateSummary('3', 'summ'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let tt_data = TTD('a', 'b', 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
		let tt = TT('3', 5, tt_data);
		let initial = S([NCT('2018-05-01')], [NCTT, tt]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskTemplateSummary('5', 'summ'))).toEqual(initial);
	});
});

describe('Updating task template start', () => {
	it('updates task template start on a task template with valid id', () => {
		let tt_data_before = TTD('a', 'b', 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
		let tt_data_after = TTD('a', 'b', 19, List(), List(), List(), '12:00', '2000-01-01', '2122-01-01');
		let tt_before = TT('3', 5, tt_data_before);
		let tt_after = TT_('3', 5, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskTemplateStart('3', '2000-01-01'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let tt_data = TTD('a', 'b', 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
		let tt = TT('3', 5, tt_data);
		let initial = S([NCT('2018-05-01')], [NCTT, tt]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskTemplateStart('5', '2000-01-01'))).toEqual(initial);
	});
});

describe('Updating task time', () => {
	it('updates task time on a task with valid id', () => {
		let t_data_before = TD('a', 'b', '2018-05-01', '14:00', false);
		let t_data_after = TD('a', 'b', '2018-05-01', '18:00', false);
		let t_before = T('3', 5, t_data_before);
		let t_after = T_('3', 5, t_data_after, t_data_before);
		let initial = S([NCT('2018-05-01'), t_before], [NCTT]);
		let final = S([NCT('2018-05-01'), t_after], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskTime('3', '18:00'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let t_data_before = TD('a', 'b', '2018-05-01', '16:00', false);
		let t_before = T('3', 5, t_data_before);
		let initial = S([NCT('2018-05-01'), t_before], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskTime('5', '20:00'))).toEqual(initial);
	});
});

describe('Updating task template time', () => {
	it('updates task template time on a task template with valid id', () => {
		let tt_data_before = TTD('a', 'b', 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
		let tt_data_after = TTD('a', 'b', 19, List(), List(), List(), '18:00', '2111-01-01', '2122-01-01');
		let tt_before = TT('3', 5, tt_data_before);
		let tt_after = TT_('3', 5, tt_data_after, tt_data_before);
		let initial = S([NCT('2018-05-01')], [NCTT, tt_before]);
		let final = S([NCT('2018-05-01')], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskTemplateTime('3', '18:00'))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let tt_data = TTD('a', 'b', 19, List(), List(), List(), '12:00', '2111-01-01', '2122-01-01');
		let tt = TT('3', 5, tt_data);
		let initial = S([NCT('2018-05-01')], [NCTT, tt]);
		expect(tasks(initial, '2018-05-01', '2018-05-01', updateTaskTemplateTime('5', '18:00'))).toEqual(initial);
	});
});

describe('Updating date', () => {
	let old_t_done = getTask('4', '', 'old', 'very old', '2018-05-02', '12:00', true);
	let old_t_undone = getTask('4', '', 'old', 'very old', '2018-05-02', '12:00', false);
	let old_tt = getTaskTemplate('16', 'old', 'old task (template)', 8, 4, List(), List(), List(), '12:00', '2018-01-01', '2018-04-05');
	let old_tt_child_undone = getTask('88', '16', 'old', 'old task (template)', '2018-04-01', '12:00', false);
	let full_tt = getTaskTemplate('17', 'full', 'full task (template)', 8, 8, List(), List(), List(), '12:00', '2018-01-01', '2019-05-05');
	let full_tt_child_undone = getTask('88', '17', 'full', 'full task (template)', '2018-04-01', '12:00', false);
	let tt_good = getTaskTemplate('66', 'good', 'good task template', 100, 2, List([1]), List([1]), List([1]), '12:00', '2000-01-01', '2020-01-01');
	it('removes old done tasks', () => {
		let initial = S([NCT('2018-05-01'), old_t_done], [NCTT]);
		let final = S([NCT('2018-05-10')], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('keeps old undone tasks', () => {
		let initial = S([NCT('2018-05-01'), old_t_undone], [NCTT]);
		let final = S([NCT('2018-05-10'), old_t_undone], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('removes old task templates, which have no childs', () => {
		let initial = S([NCT('2018-05-01')], [NCTT, old_tt]);
		let final = S([NCT('2018-05-10')], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('keeps old task templates, which still have undone childs', () => {
		let initial = S([NCT('2018-05-01'), old_tt_child_undone], [NCTT, old_tt]);
		let final = S([NCT('2018-05-10'), old_tt_child_undone], [NCTT, old_tt]);
		expect(tasks(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('removes full task templates, which have no childs', () => {
		let tt_data = TTD('full', 'full task (template)', 8, List(), List(), List(), '12:00', '2018-01-01', '2019-01-01');
		let tt = TT('17', 8, tt_data);
		let initial = S([NCT('2018-05-01')], [NCTT, tt]);
		let final = S([NCT('2018-05-10')], [NCTT]);
		expect(tasks(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('keeps full task templates, which still have undone childs', () => {
		let initial = S([NCT('2018-05-01'), full_tt_child_undone], [NCTT, full_tt]);
		let final = S([NCT('2018-05-10'), full_tt_child_undone], [NCTT, full_tt]);
		expect(tasks(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('keeps task templates, which are neither full nor old', () => {
		let initial = S([NCT('2018-05-01')], [NCTT, tt_good]);
		let final = S([NCT('2018-05-10')], [NCTT, tt_good]);
		expect(tasks(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('keeps task templates, which have no set start and end dates and have no childs', () => {
		let tt_data = TTD('a', 'b', 4, List([3]), List([2]), List([4]), '12:00', '', '');
		let tt = TT('3', 2, tt_data);
		let initial = S([NCT('2018-05-01')], [NCTT, tt]);
		let final = S([NCT('2018-05-10')], [NCTT, tt]);
		expect(tasks(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('keeps task templates, which have n of infinity and have no childs', () => {
		let tt_data = TTD('a', 'b', -1, List([3]), List([2]), List([4]), '12:00', '2018-01-01', '2019-01-01');
		let tt = TT('3', 2, tt_data);
		let initial = S([NCT('2018-05-01')], [NCTT, tt]);
		let final = S([NCT('2018-05-10')], [NCTT, tt]);
		expect(tasks(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('adds latest template child, until counter of template is full', () => {
		let tt_data = TTD('everyday', 'task at every day', 5, List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), List([1, 2, 3, 4, 5]), List([1, 2, 3, 4, 5, 6, 7]), '12:30', '2018-01-01', '2019-01-01');
		let tt_before = TT('22', 2, tt_data);
		let tt_after = TT('22', 5, tt_data);
		let old_child_data = TD('everyday', 'task at every day', '2018-05-01', '12:30', false);
		let old_child = T('18', '22', old_child_data);
		let new_child_data = TD('everyday', 'task at every day', '2018-05-04', '12:30', false);
		let new_child = T('42', '22', new_child_data);
		let initial = S([NCT('2018-05-01'), old_child], [NCTT, tt_before]);
		let final = S([NCT('2018-05-10'), new_child], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('adds latest template child, until counter of template is full (start date and end date empty)', () => {
		let tt_data = TTD('everyday', 'task at every day', 5, List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), List([1, 2, 3, 4, 5]), List([1, 2, 3, 4, 5, 6, 7]), '12:30', '', '');
		let tt_before = TT('22', 2, tt_data);
		let tt_after = TT('22', 5, tt_data);
		let old_child_data = TD('everyday', 'task at every day', '2018-05-01', '12:30', false);
		let old_child = T('18', '22', old_child_data);
		let new_child_data = TD('everyday', 'task at every day', '2018-05-04', '12:30', false);
		let new_child = T('42', '22', new_child_data);
		let initial = S([NCT('2018-05-01'), old_child], [NCTT, tt_before]);
		let final = S([NCT('2018-05-10'), new_child], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('adds latest template child, if n of template is infinity (start date and end date empty)', () => {
		let tt_data = TTD('everyday', 'task at every day', -1, List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), List([1, 2, 3, 4, 5]), List([1, 2, 3, 4, 5, 6, 7]), '12:30', '', '');
		let tt_before = TT('22', 2, tt_data);
		let tt_after = TT('22', 11, tt_data);
		let old_child_data = TD('everyday', 'task at every day', '2018-05-01', '12:30', false);
		let old_child = T('42', '22', old_child_data);
		let new_child_data = TD('everyday', 'task at every day', '2018-05-10', '12:30', false);
		let new_child = T('42', '22', new_child_data);
		let initial = S([NCT('2018-05-01'), old_child], [NCTT, tt_before]);
		let final = S([NCT('2018-05-10'), new_child], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('adds latest template childs, until end is reached', () => {
		let tt_data = TTD('everyday', 'task at every day', 100, List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), List([1, 2, 3, 4, 5]), List([1, 2, 3, 4, 5, 6, 7]), '12:30', '2018-01-01', '2018-05-03');
		let tt_before = TT('22', 20, tt_data);
		let tt_after = TT('22', 22, tt_data);
		let old_child_data = TD('everyday', 'task at every day', '2018-05-01', '12:30', false);
		let old_child = T('18', '22', old_child_data);
		let new_child_data = TD('everyday', 'task at every day', '2018-05-03', '12:30', false);
		let new_child = T('42', '22', new_child_data);
		let initial = S([NCT('2018-05-01'), old_child], [NCTT, tt_before]);
		let final = S([NCT('2018-05-10'), new_child], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('adds latest template childs, until end is reached (start date empty)', () => {
		let tt_data = TTD('everyday', 'task at every day', 100, List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), List([1, 2, 3, 4, 5]), List([1, 2, 3, 4, 5, 6, 7]), '12:30', '', '2018-05-03');
		let tt_before = TT('22', 2, tt_data);
		let tt_after = TT('22', 4, tt_data);
		let old_child_data = TD('everyday', 'task at every day', '2018-05-01', '12:30', false);
		let old_child = T('18', '22', old_child_data);
		let new_child_data = TD('everyday', 'task at every day', '2018-05-03', '12:30', false);
		let new_child = T('42', '22', new_child_data);
		let initial = S([NCT('2018-05-01'), old_child], [NCTT, tt_before]);
		let final = S([NCT('2018-05-10'), new_child], [NCTT, tt_after]);
		expect(tasks(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
});