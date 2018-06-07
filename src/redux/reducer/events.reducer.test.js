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

const ED = (summ, desc, date, time) => Map({summ, desc, date, time});
const E = (id, tid, ed) => Map({id, tid, tmp: ed, data: ed});
const E_ = (id, tid, ed1, ed2) => Map({id, tid,	tmp: ed1, data: ed2});
const ETD = (summ, desc, n, months, weeks, days, time, start, end) => Map({summ, desc, n, months, weeks, days, time, start, end});
const ET = (id, cnt, etd) => Map({id, cnt, tmp: etd, data: etd});
const ET_ = (id, cnt, etd1, etd2) => Map({id, cnt, tmp: etd1, data: etd2});
const S = (items, templates, lastUpdate = '2018-01-01') => Map({lastUpdate, items: List(items || []), templates: List(templates || [])});

let NCE = getEvent('new');
let NCET = getEventTemplate('new');

describe('Updating last update of events', () => {
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
		let initial = S([NCE, old_e, random_e], [NCET], '2018-05-01');
		let final = S([NCE, random_e], [NCET], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('removes old event templates, which have no childs', () => {
		let initial = S([NCE], [NCET, old_et], '2018-05-01');
		let final = S([NCE], [NCET], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('removes full event templates, which have no childs', () => {
		let initial = S([NCE], [NCET, full_et], '2018-05-01');
		let final = S([NCE], [NCET], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('keeps full event templates, which still have childs', () => {
		let initial = S([NCE, full_et_child], [NCET, full_et], '2018-05-01');
		let final = S([NCE, full_et_child], [NCET, full_et], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('keeps event templates, which are neither full nor old', () => {
		let initial = S([NCE], [NCET, et_good], '2018-05-01');
		let final = S([NCE], [NCET, et_good], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('adds template childs until counter of template is full', () => {
		let initial = S([NCE], [NCET, et_overflow], '2018-05-01');
		let final = S([NCE, et_overflow_child_1, et_overflow_child_2, et_overflow_child_3], [NCET, et_overflow.set('cnt', 13)], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), mockfn))).toEqual(final);
	});
	it('adds template childs, until end of template is reached', () => {
		let initial = S([NCE], [NCET, et_ending], '2018-05-01');
		let final = S([NCE, et_ending_child_1, et_ending_child_2, et_ending_child_3, et_ending_child_4, et_ending_child_5], [NCET, et_ending.set('cnt', 15)], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), mockfn))).toEqual(final);
	});
	it('adds template childs until update date, if counter of template is not full and end is not reached', () => {
		let et_data = ETD('everyday', 'event at every day', 100, List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), List([1, 2, 3, 4, 5]), List([1, 2, 3, 4, 5, 6, 7]), '12:30', '2018-05-01', '2019-01-01');
		let et = ET('22', 2, et_data);
		let et_new = ET('22', 18, et_data);
		let child_1_data = ED('everyday', 'event at every day', '2018-05-10', '12:30');
		let child_2_data = ED('everyday', 'event at every day', '2018-05-11', '12:30');
		let child_3_data = ED('everyday', 'event at every day', '2018-05-12', '12:30');
		let child_4_data = ED('everyday', 'event at every day', '2018-05-13', '12:30');
		let child_5_data = ED('everyday', 'event at every day', '2018-05-14', '12:30');
		let child_6_data = ED('everyday', 'event at every day', '2018-05-15', '12:30');
		let child_7_data = ED('everyday', 'event at every day', '2018-05-16', '12:30');
		let child_8_data = ED('everyday', 'event at every day', '2018-05-17', '12:30');
		let child_1 = E('42', '22', child_1_data);
		let child_2 = E('42', '22', child_2_data);
		let child_3 = E('42', '22', child_3_data);
		let child_4 = E('42', '22', child_4_data);
		let child_5 = E('42', '22', child_5_data);
		let child_6 = E('42', '22', child_6_data);
		let child_7 = E('42', '22', child_7_data);
		let child_8 = E('42', '22', child_8_data);
		let initial = S([NCE], [NCET, et], '2018-05-01');
		let final = S([NCE, child_1, child_2, child_3, child_4, child_5, child_6, child_7, child_8], [NCET, et_new], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('adds a template child to exactly one week, if set as day of year', () => {
		let et_data = ETD('everyday', 'event at every day', -1, List(), List(), List([130, 137]), '12:30', '', '');
		let et = ET('22', 2, et_data);
		let et_new = ET('22', 4, et_data);
		let child_1_data = ED('everyday', 'event at every day', '2018-05-10', '12:30');
		let child_2_data = ED('everyday', 'event at every day', '2018-05-17', '12:30');
		let child_1 = E('42', '22', child_1_data);
		let child_2 = E('42', '22', child_2_data);
		let initial = S([NCE], [NCET, et], '2018-05-01');
		let final = S([NCE, child_1, child_2], [NCET, et_new], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('adds template childs in forecast, if template starts within it', () => {
		let et_data = ETD('everyday', 'event at every day', -1, List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), List([1, 2, 3, 4, 5]), List([1, 2, 3, 4, 5, 6, 7]), '12:30', '2018-05-16', '');
		let et = ET('22', 2, et_data);
		let et_new = ET('22', 4, et_data);
		let child_1_data = ED('everyday', 'event at every day', '2018-05-16', '12:30');
		let child_2_data = ED('everyday', 'event at every day', '2018-05-17', '12:30');
		let child_1 = E('42', '22', child_1_data);
		let child_2 = E('42', '22', child_2_data);
		let initial = S([NCE], [NCET, et], '2018-05-01');
		let final = S([NCE, child_1, child_2], [NCET, et_new], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
	it('updates last update to today', () => {
		let initial = S([], [], '2000-01-01');
		let final = S([], [], '2018-05-17');
		expect(events(initial, updateLastUpdate(moment('2018-05-10 12:00'), () => '42'))).toEqual(final);
	});
});

describe('Saving event templates', () => {
	it('saves modifications of data, creates new childs in forecast on matching days', () => {
		let before = ETD('a', 'b', 10, List([3, 4]), List(), List([11]), '12:00', '2010-01-01', '2019-01-01');
		let after = ETD('c', 'd', 10, List([3, 4]), List(), List([12, 13, 14, 15, 16, 17]), '22:00', '2010-01-01', '2019-01-01');
		let et_mod = ET_('3', 8, after, before);
		let et_saved = ET('3', 10, after);
		let data_old_child = ED('a', 'b', '2018-05-11', '12:00');
		let data_new_child_1 = ED('c', 'd', '2018-05-12', '22:00');
		let data_new_child_2 = ED('c', 'd', '2018-05-13', '22:00');
		let data_new_child_3 = ED('c', 'd', '2018-05-14', '22:00');
		let et_old_child = E('55', '3', data_old_child);
		let et_new_child_1 = E('56', '3', data_new_child_1);
		let et_new_child_2 = E('57', '3', data_new_child_2);
		let et_new_child_3 = E('58', '3', data_new_child_3);
		let mockfn = jest.fn().mockReturnValueOnce('56').mockReturnValueOnce('57').mockReturnValueOnce('58');
		let initial = S([NCE, et_old_child], [NCET, et_mod]);
		let final = S([NCE, et_new_child_1, et_new_child_2, et_new_child_3], [NCET, et_saved]);
		expect(events(initial, saveEventTemplate('3', moment('2018-05-10'), mockfn))).toEqual(final);
	});
	
	it('inserts a new task template on saving "new", creates new childs in forecast on matching days', () => {
		let cleanData = ETD('', '', 0, List(), List(), List(), '', '', '');
		let newData = ETD('c', 'd', 3, List([3, 4]), List(), List([12, 13, 14, 15, 16, 17]), '22:00', '2010-01-01', '2019-01-01');
		let et_new = ET_('new', 0, newData, cleanData);
		let et_new_saved = ET('55', 3, newData);
		let data_child_1 = ED('c', 'd', '2018-05-12', '22:00');
		let data_child_2 = ED('c', 'd', '2018-05-13', '22:00');
		let data_child_3 = ED('c', 'd', '2018-05-14', '22:00');
		let et_child_1 = E('56', '55', data_child_1);
		let et_child_2 = E('57', '55', data_child_2);
		let et_child_3 = E('58', '55', data_child_3);
		let mockfn = jest.fn().mockReturnValueOnce('55').mockReturnValueOnce('56').mockReturnValueOnce('57').mockReturnValueOnce('58');
		let initial = S([NCE], [et_new]);
		let final = S([NCE, et_child_1, et_child_2, et_child_3], [NCET, et_new_saved]);
		expect(events(initial, saveEventTemplate('new', moment('2018-05-10'), mockfn))).toEqual(final);
	});

	it('does not sum n from before and from after modification', () => {
		let freshData = ETD('a', 'b', 2, List([3, 4]), List([1, 2, 3, 4, 5]), List([1, 2, 3, 4, 5, 6, 7]), '12:00', '2010-01-01', '2999-12-31');
		// let et_fresh = ET('3', 2, freshData);
		let freshModData = ETD('a', 'b', 3, List([3, 4]), List([1, 2, 3, 4, 5]), List([1, 2, 3, 4, 5, 6, 7]), '12:00', '2010-01-01', '2999-12-31');
		let et_fresh_mod = ET_('3', 2, freshModData, freshData);
		let et_fresh_saved = ET('3', 3, freshModData);
		let et_fresh_child_1_data = ED('a', 'b', '2018-05-10', '12:00');
		let et_fresh_child_2_data = ED('a', 'b', '2018-05-11', '12:00');
		let et_fresh_child_3_data = ED('a', 'b', '2018-05-12', '12:00');
		let et_fresh_child_1 = E('100', '3', et_fresh_child_1_data);
		let et_fresh_child_2 = E('101', '3', et_fresh_child_2_data);
		let et_fresh_child_3 = E('102', '3', et_fresh_child_3_data);
		let mockfn = jest.fn().mockReturnValueOnce('100').mockReturnValueOnce('101').mockReturnValueOnce('102');
		let initial = S([NCE, et_fresh_child_1, et_fresh_child_2], [NCET, et_fresh_mod]);
		let final = S([NCE, et_fresh_child_1, et_fresh_child_2, et_fresh_child_3], [NCET, et_fresh_saved]);
		expect(events(initial, saveEventTemplate('3', moment('2018-05-10'), mockfn))).toEqual(final);
	});

	it('does not alter state, when given id is not found', () => {
		let data_old_child = ED('a', 'b', '2018-05-11', '12:00');
		let et_old_child = E('55', '3', data_old_child);
		let cleanData = ETD('', '', 0, List(), List(), List(), '', '', '');
		let newData = ETD('c', 'd', 3, List([3, 4]), List(), List([12, 13, 14, 15, 16, 17]), '22:00', '2010-01-01', '2019-01-01');
		let et_new = ET_('new', 0, newData, cleanData);
		let after = ETD('c', 'd', 10, List([3, 4]), List(), List([12, 13, 14, 15, 16, 17]), '22:00', '2010-01-01', '2019-01-01');
		let et_saved = ET('3', 10, after);
		let initial = S([NCE, et_old_child], [et_new, et_saved]);
		expect(events(initial, saveEventTemplate('1001', moment('2018-05-10'), mockfn))).toEqual(initial);
	});

});