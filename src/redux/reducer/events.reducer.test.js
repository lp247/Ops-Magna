jest.unmock('immutable');
jest.unmock('moment');

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

import moment from 'moment';
import {Map, List} from 'immutable';
import events from './events.reducer';
import {getEvent, getEventTemplate} from '../../utils/objects';
import {updateLastUpdate} from '../actions/tasksEventsUpdate.actions';
import {saveEventTemplate} from '../actions/events.actions';

const S = (items, templates, lastUpdate = '2018-01-01') => Map({lastUpdate, items: List(items || []), templates: List(templates || [])});

describe('Updating last update of events', () => {
	let new_e_clean = getEvent('new');
	let new_et_clean = getEventTemplate('new');
	let old_e = getEvent('4', '', 'old', 'very old', '2018-05-02', '12:00');
	let random_e = getEvent('5', '', 'eventsumm', 'eventdesc', '2018-05-15', '12:00');
	let old_et = getEventTemplate('16', 'old', 'old event (template)', 8, 4, List(), List(), List(), '12:00', '2018-01-01', '2018-04-05');
	let old_et_child = getEvent('88', '16', 'old', 'old event (template)', '2018-05', '12:00');
	let full_et = getEventTemplate('17', 'full', 'full event (template)', 8, 8, List(), List(), List(), '12:00', '2018-01-01', '2019-05-05');
	let full_et_child = getEvent('88', '17', 'full', 'full event (template)', '2018-05-15', '12:00');
	let et_overflow = getEventTemplate('22', 'everyday', 'event at every day', 13, 2, List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), List([1, 2, 3, 4, 5]), List([1, 2, 3, 4, 5, 6, 7]), '12:30', '2018-01-01', '2019-01-01');
	let et_ending = getEventTemplate('22', 'everyday', 'event at every day', 100, 2, List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), List([1, 2, 3, 4, 5]), List([1, 2, 3, 4, 5, 6, 7]), '12:30', '2018-01-01', '2018-05-14');
	let et_overflow_child_1 = getEvent('108', '22', 'everyday', 'event at every day', '2018-05-10', '12:30');
	let et_overflow_child_2 = getEvent('109', '22', 'everyday', 'event at every day', '2018-05-11', '12:30');
	let et_overflow_child_3 = getEvent('110', '22', 'everyday', 'event at every day', '2018-05-12', '12:30');
	let et_ending_child_1 = getEvent('119', '22', 'everyday', 'event at every day', '2018-05-10', '12:30');
	let et_ending_child_2 = getEvent('120', '22', 'everyday', 'event at every day', '2018-05-11', '12:30');
	let et_ending_child_3 = getEvent('121', '22', 'everyday', 'event at every day', '2018-05-12', '12:30');
	let et_ending_child_4 = getEvent('122', '22', 'everyday', 'event at every day', '2018-05-13', '12:30');
	let et_ending_child_5 = getEvent('123', '22', 'everyday', 'event at every day', '2018-05-14', '12:30');
	let et_good = getEventTemplate('66', 'good', 'good event template', 100, 2, List([1]), List([1]), List([1]), '12:00', '2000-01-01', '2020-01-01');
	it('removes old events from before today', () => {
		let initial = S([new_e_clean, old_e, random_e], [new_et_clean], '2018-05-01');
		let final = S([new_e_clean, random_e], [new_et_clean], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('removes old event templates, which have no childs', () => {
		let initial = S([new_e_clean], [new_et_clean, old_et], '2018-05-01');
		let final = S([new_e_clean], [new_et_clean], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('removes full event templates, which have no childs', () => {
		let initial = S([new_e_clean], [new_et_clean, full_et], '2018-05-01');
		let final = S([new_e_clean], [new_et_clean], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('keeps full event templates, which still have childs', () => {
		let initial = S([new_e_clean, full_et_child], [new_et_clean, full_et], '2018-05-01');
		let final = S([new_e_clean, full_et_child], [new_et_clean, full_et], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('keeps event templates, which are neither full nor old', () => {
		let initial = S([new_e_clean], [new_et_clean, et_good], '2018-05-01');
		let final = S([new_e_clean], [new_et_clean, et_good], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('adds template childs until update date, if counter of template is not full', () => {
		let initial = S([new_e_clean], [new_et_clean, et_overflow], '2018-05-01');
		let final = S([new_e_clean, et_overflow_child_1, et_overflow_child_2, et_overflow_child_3], [new_et_clean, et_overflow.set('cnt', 13)], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), mockfn))).toEqual(final);
	});
	it('adds latest template childs, if end is not reached', () => {
		let initial = S([new_e_clean], [new_et_clean, et_ending], '2018-05-01');
		let final = S([new_e_clean, et_ending_child_1, et_ending_child_2, et_ending_child_3, et_ending_child_4, et_ending_child_5], [new_et_clean, et_ending.set('cnt', 15)], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), mockfn))).toEqual(final);
	});
	it('updates last update to today', () => {
		let initial = S([], [], '2000-01-01');
		let final = S([], [], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
});

describe('Saving event templates', () => {
	let new_e_clean = getEvent('new');
	let new_et_clean = getEventTemplate('new');
	let new_et_modified = getEventTemplate('new').set('tmp', Map({summ: 'a', desc: 'b', n: 4, months: List([1, 2, 3]), weeks: List([1, 2]), days: List([1]), time: '12:00', start: '2000-01-01', end: '2999-12-31'}));
	let new_et_saved = getEventTemplate('42', 'a', 'b', 4, 0, List([1, 2, 3]), List([1, 2]), List([1]), '12:00', '2000-01-01', '2999-12-31');

	let et_1_old_child_1 = getEvent('55', '3', 'a', 'b', '2018-05-04', '12:00');
	let et_1_new_child_1 = getEvent('56', '3', 'c', 'd', '2018-05-12', '22:00');
	let et_1_new_child_2 = getEvent('57', '3', 'c', 'd', '2018-05-13', '22:00');
	let et_1_new_child_3 = getEvent('58', '3', 'c', 'd', '2018-05-14', '22:00');
	let et_1_modified = getEventTemplate('3', 'a', 'b', 10, 5, List([3, 4]), List(), List([4]), '12:00', '2010-01-01', '2019-01-01').setIn(['tmp', 'summ'], 'c').setIn(['tmp', 'desc'], 'd').setIn(['tmp', 'time'], '22:00').setIn(['tmp', 'days'], List([4, 12, 13, 14]));
	let et_1_saved = getEventTemplate('3', 'c', 'd', 10, 5, List([3, 4]), List(), List([4, 12, 13, 14]), '22:00', '2010-01-01', '2019-01-01');
	let et_1_new = getEventTemplate('new').set('tmp', Map({summ: 'c', desc: 'd', n: 10, months: List([3, 4]), weeks: List(), days: List([4, 12, 13, 14]), time: '22:00', start: '2010-01-01', end: '2019-01-01'}));

	// let et_1_child_1 = getEvent('100', '3', 'a', 'b', '2018-04-04', '12:00', false);
	// let et_1_child_1_modified = getEvent('100', '3', 'c', 'd', '2018-04-04', '22:00', false);

	// let et_2_modified = getEventTemplate('2', 'a', 'b', 10, 5, List([3, 4]), List(), List([4]), '12:00', '2010-01-01', '2019-01-01').setIn(['tmp', 'summ'], 'c').setIn(['tmp', 'desc'], 'd').setIn(['tmp', 'time'], '22:00').setIn(['tmp', 'days'], List([4, 6, 8, 10])).setIn(['tmp', 'months'], List([3, 4, 5]));
	// let et_2_saved = getEventTemplate('2', 'c', 'd', 10, 5, List([3, 4, 5]), List(), List([4, 6, 8, 10]), '22:00', '2010-01-01', '2019-01-01');
	// let et_2_child_1 = getEvent('99', '2', 'a', 'b', '2018-04-04', '12:00', false);
	// let et_2_new_child_today = getEvent('100', '2', 'c', 'd', '2018-05-10', '22:00', false);
	// let et_2_new = getEventTemplate('new').set('tmp', Map({summ: 'c', desc: 'd', n: 10, months: List([3, 4, 5]), weeks: List(), days: List([4, 6, 8, 10]), time: '22:00', start: '2010-01-01', end: '2019-01-01'})).set('cnt', 5);
	it('saves modifications of data, creates new childs in forecast on matching days', () => {
		let mockfn = jest.fn().mockReturnValueOnce('56').mockReturnValueOnce('57').mockReturnValueOnce('58');
		let initial = S([new_e_clean, et_1_old_child_1], [new_et_clean, et_1_modified]);
		let final = S([new_e_clean, et_1_new_child_1, et_1_new_child_2, et_1_new_child_3], [new_et_clean, et_1_saved]);
		expect(events(initial, saveEventTemplate('3', moment('2018-05-10'), mockfn))).toEqual(final);
	});
	it('inserts a new task template on saving "new", creates new childs in forecast on matching days', () => {
		let mockfn = jest.fn().mockReturnValueOnce('55').mockReturnValueOnce('56').mockReturnValueOnce('57').mockReturnValueOnce('58');
		let initial = S([new_e_clean], [et_1_new]);
		let final = S([new_e_clean, et_1_new_child_1.set('tid', '55'), et_1_new_child_2.set('tid', '55'), et_1_new_child_3.set('tid', '55')], [new_et_clean, et_1_saved.set('id', '55').set('cnt', 0)]);
		expect(events(initial, saveEventTemplate('new', moment('2018-05-10'), mockfn))).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let initial = S([new_e_clean, et_1_old_child_1], [et_1_new, et_1_saved]);
		expect(events(initial, saveEventTemplate('1001', moment('2018-05-10'), mockfn))).toEqual(initial);
	});
});