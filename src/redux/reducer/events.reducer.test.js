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

import {Map, List} from 'immutable';
import events from './events.reducer';
import {getEvent, getEventTemplate} from '../../utils/objects';
import {saveEventTemplate} from '../actions/events.actions';
import {updateDate} from '../actions/date.actions';

const ED = (summ, desc, date, time) => Map({summ, desc, date, time});
const E = (id, tid, ed) => Map({id, tid, tmp: ed, data: ed});
const E_ = (id, tid, ed1, ed2) => Map({id, tid,	tmp: ed1, data: ed2});
const ETD = (summ, desc, n, months, weeks, days, time, start, end) => Map({summ, desc, n, months, weeks, days, time, start, end});
const ET = (id, cnt, etd) => Map({id, cnt, tmp: etd, data: etd});
const ET_ = (id, cnt, etd1, etd2) => Map({id, cnt, tmp: etd1, data: etd2});
const S = (items, templates) => Map({items: List(items || []), templates: List(templates || [])});

let NCE = (date) => getEvent('new').setIn(['tmp', 'date'], date).setIn(['data', 'date'], date);
let NCET = getEventTemplate('new');

describe('Updating date', () => {
	let old_e = getEvent('4', '', 'old', 'very old', '2018-05-02', '12:00');
	let random_e = getEvent('5', '', 'eventsumm', 'eventdesc', '2018-05-15', '12:00');
	let old_et = getEventTemplate('16', 'old', 'old event (template)', 8, 4, List(), List(), List(), '12:00', '2018-01-01', '2018-04-05');
	let full_et = getEventTemplate('17', 'full', 'full event (template)', 8, 8, List(), List(), List(), '12:00', '2018-01-01', '2019-05-05');
	let full_et_child = getEvent('88', '17', 'full', 'full event (template)', '2018-05-15', '12:00');
	let et_good = getEventTemplate('66', 'good', 'good event template', 100, 2, List([1]), List([1]), List([1]), '12:00', '2000-01-01', '2020-01-01');
	it('removes old events from before today', () => {
		let initial = S([NCE('2018-05-01'), old_e, random_e], [NCET]);
		let final = S([NCE('2018-05-10'), random_e], [NCET]);
		expect(events(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('removes old event templates, which have no childs', () => {
		let initial = S([NCE('2018-05-01')], [NCET, old_et]);
		let final = S([NCE('2018-05-10')], [NCET]);
		expect(events(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('removes full event templates, which have no childs', () => {
		let initial = S([NCE('2018-05-01')], [NCET, full_et]);
		let final = S([NCE('2018-05-10')], [NCET]);
		expect(events(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('keeps full event templates, which still have childs', () => {
		let initial = S([NCE('2018-05-01'), full_et_child], [NCET, full_et]);
		let final = S([NCE('2018-05-10'), full_et_child], [NCET, full_et]);
		expect(events(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('keeps event templates, which are neither full nor old', () => {
		let initial = S([NCE('2018-05-01')], [NCET, et_good]);
		let final = S([NCE('2018-05-10')], [NCET, et_good]);
		expect(events(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('adds template childs until counter of template is full', () => {
		let mock = jest.fn()
			.mockReturnValueOnce('109').mockReturnValueOnce('110').mockReturnValueOnce('111')
			.mockReturnValueOnce('112').mockReturnValueOnce('113').mockReturnValueOnce('114')
			.mockReturnValueOnce('115').mockReturnValueOnce('116').mockReturnValueOnce('117');
		let et_data = ETD('everyday', 'event at every day', 13, List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), List([1, 2, 3, 4, 5]), List([1, 2, 3, 4, 5, 6, 7]), '12:30', '2018-01-01', '2019-01-01');
		let et = ET('22', 8, et_data);
		let et_new = ET('22', 13, et_data);
		let child_1_data = ED('everyday', 'event at every day', '2018-05-01', '12:30');
		let child_2_data = ED('everyday', 'event at every day', '2018-05-02', '12:30');
		let child_3_data = ED('everyday', 'event at every day', '2018-05-03', '12:30');
		let child_4_data = ED('everyday', 'event at every day', '2018-05-04', '12:30');
		let child_5_data = ED('everyday', 'event at every day', '2018-05-05', '12:30');
		let child_6_data = ED('everyday', 'event at every day', '2018-05-06', '12:30');
		let child_7_data = ED('everyday', 'event at every day', '2018-05-07', '12:30');
		let child_8_data = ED('everyday', 'event at every day', '2018-05-08', '12:30');
		let child_10_data = ED('everyday', 'event at every day', '2018-05-10', '12:30');
		let child_11_data = ED('everyday', 'event at every day', '2018-05-11', '12:30');
		let child_12_data = ED('everyday', 'event at every day', '2018-05-12', '12:30');
		let child_13_data = ED('everyday', 'event at every day', '2018-05-13', '12:30');
		let child_1 = E('101', '22', child_1_data);
		let child_2 = E('102', '22', child_2_data);
		let child_3 = E('103', '22', child_3_data);
		let child_4 = E('104', '22', child_4_data);
		let child_5 = E('105', '22', child_5_data);
		let child_6 = E('106', '22', child_6_data);
		let child_7 = E('107', '22', child_7_data);
		let child_8 = E('108', '22', child_8_data);
		let child_10 = E('110', '22', child_10_data);
		let child_11 = E('111', '22', child_11_data);
		let child_12 = E('112', '22', child_12_data);
		let child_13 = E('113', '22', child_13_data);
		let initial = S([NCE('2018-05-01'), child_1, child_2, child_3, child_4, child_5, child_6, child_7, child_8], [NCET, et]);
		let final = S([NCE('2018-05-10'), child_10, child_11, child_12, child_13], [NCET, et_new]);
		expect(events(initial, '2018-05-01', '2018-05-10', updateDate(), mock)).toEqual(final);
	});
	it('adds template childs, until end of template is reached', () => {
		let mock = jest.fn()
			.mockReturnValueOnce('109').mockReturnValueOnce('110').mockReturnValueOnce('111')
			.mockReturnValueOnce('112').mockReturnValueOnce('113').mockReturnValueOnce('114')
			.mockReturnValueOnce('115').mockReturnValueOnce('116').mockReturnValueOnce('117');
		let et_data = ETD('everyday', 'event at every day', 100, List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), List([1, 2, 3, 4, 5]), List([1, 2, 3, 4, 5, 6, 7]), '12:30', '2018-01-01', '2018-05-14');
		let et = ET('22', 10, et_data);
		let et_new = ET('22', 16, et_data);
		let child_1_data = ED('everyday', 'event at every day', '2018-05-01', '12:30');
		let child_2_data = ED('everyday', 'event at every day', '2018-05-02', '12:30');
		let child_3_data = ED('everyday', 'event at every day', '2018-05-03', '12:30');
		let child_4_data = ED('everyday', 'event at every day', '2018-05-04', '12:30');
		let child_5_data = ED('everyday', 'event at every day', '2018-05-05', '12:30');
		let child_6_data = ED('everyday', 'event at every day', '2018-05-06', '12:30');
		let child_7_data = ED('everyday', 'event at every day', '2018-05-07', '12:30');
		let child_8_data = ED('everyday', 'event at every day', '2018-05-08', '12:30');
		let child_10_data = ED('everyday', 'event at every day', '2018-05-10', '12:30');
		let child_11_data = ED('everyday', 'event at every day', '2018-05-11', '12:30');
		let child_12_data = ED('everyday', 'event at every day', '2018-05-12', '12:30');
		let child_13_data = ED('everyday', 'event at every day', '2018-05-13', '12:30');
		let child_14_data = ED('everyday', 'event at every day', '2018-05-14', '12:30');
		let child_1 = E('101', '22', child_1_data);
		let child_2 = E('102', '22', child_2_data);
		let child_3 = E('103', '22', child_3_data);
		let child_4 = E('104', '22', child_4_data);
		let child_5 = E('105', '22', child_5_data);
		let child_6 = E('106', '22', child_6_data);
		let child_7 = E('107', '22', child_7_data);
		let child_8 = E('108', '22', child_8_data);
		let child_10 = E('110', '22', child_10_data);
		let child_11 = E('111', '22', child_11_data);
		let child_12 = E('112', '22', child_12_data);
		let child_13 = E('113', '22', child_13_data);
		let child_14 = E('114', '22', child_14_data);
		let initial = S([NCE('2018-05-01'), child_1, child_2, child_3, child_4, child_5, child_6, child_7, child_8], [NCET, et]);
		let final = S([NCE('2018-05-10'), child_10, child_11, child_12, child_13, child_14], [NCET, et_new]);
		expect(events(initial, '2018-05-01', '2018-05-10', updateDate(), mock)).toEqual(final);
	});
	it('adds template childs until update date, if counter of template is not full and end is not reached', () => {
		let mock = jest.fn()
			.mockReturnValueOnce('109').mockReturnValueOnce('110').mockReturnValueOnce('111')
			.mockReturnValueOnce('112').mockReturnValueOnce('113').mockReturnValueOnce('114')
			.mockReturnValueOnce('115').mockReturnValueOnce('116').mockReturnValueOnce('117');
		let et_data = ETD('everyday', 'event at every day', 100, List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), List([1, 2, 3, 4, 5]), List([1, 2, 3, 4, 5, 6, 7]), '12:30', '2018-05-01', '2019-01-01');
		let et = ET('22', 8, et_data);
		let et_new = ET('22', 17, et_data);
		let child_1_data = ED('everyday', 'event at every day', '2018-05-01', '12:30');
		let child_2_data = ED('everyday', 'event at every day', '2018-05-02', '12:30');
		let child_3_data = ED('everyday', 'event at every day', '2018-05-03', '12:30');
		let child_4_data = ED('everyday', 'event at every day', '2018-05-04', '12:30');
		let child_5_data = ED('everyday', 'event at every day', '2018-05-05', '12:30');
		let child_6_data = ED('everyday', 'event at every day', '2018-05-06', '12:30');
		let child_7_data = ED('everyday', 'event at every day', '2018-05-07', '12:30');
		let child_8_data = ED('everyday', 'event at every day', '2018-05-08', '12:30');
		let child_10_data = ED('everyday', 'event at every day', '2018-05-10', '12:30');
		let child_11_data = ED('everyday', 'event at every day', '2018-05-11', '12:30');
		let child_12_data = ED('everyday', 'event at every day', '2018-05-12', '12:30');
		let child_13_data = ED('everyday', 'event at every day', '2018-05-13', '12:30');
		let child_14_data = ED('everyday', 'event at every day', '2018-05-14', '12:30');
		let child_15_data = ED('everyday', 'event at every day', '2018-05-15', '12:30');
		let child_16_data = ED('everyday', 'event at every day', '2018-05-16', '12:30');
		let child_17_data = ED('everyday', 'event at every day', '2018-05-17', '12:30');
		let child_1 = E('101', '22', child_1_data);
		let child_2 = E('102', '22', child_2_data);
		let child_3 = E('103', '22', child_3_data);
		let child_4 = E('104', '22', child_4_data);
		let child_5 = E('105', '22', child_5_data);
		let child_6 = E('106', '22', child_6_data);
		let child_7 = E('107', '22', child_7_data);
		let child_8 = E('108', '22', child_8_data);
		let child_10 = E('110', '22', child_10_data);
		let child_11 = E('111', '22', child_11_data);
		let child_12 = E('112', '22', child_12_data);
		let child_13 = E('113', '22', child_13_data);
		let child_14 = E('114', '22', child_14_data);
		let child_15 = E('115', '22', child_15_data);
		let child_16 = E('116', '22', child_16_data);
		let child_17 = E('117', '22', child_17_data);
		let initial = S([NCE('2018-05-01'), child_1, child_2, child_3, child_4, child_5, child_6, child_7, child_8], [NCET, et]);
		let final = S([NCE('2018-05-10'), child_10, child_11, child_12, child_13, child_14, child_15, child_16, child_17], [NCET, et_new]);
		expect(events(initial, '2018-05-01', '2018-05-10', updateDate(), mock)).toEqual(final);
	});
	it('adds a template child to exactly one week, if set as day of year', () => {
		let et_data = ETD('everyday', 'event at every day', -1, List(), List(), List([130, 137]), '12:30', '', '');
		let et = ET('22', 2, et_data);
		let et_new = ET('22', 4, et_data);
		let child_1_data = ED('everyday', 'event at every day', '2018-05-10', '12:30');
		let child_2_data = ED('everyday', 'event at every day', '2018-05-17', '12:30');
		let child_1 = E('42', '22', child_1_data);
		let child_2 = E('42', '22', child_2_data);
		let initial = S([NCE('2018-05-01')], [NCET, et]);
		let final = S([NCE('2018-05-10'), child_1, child_2], [NCET, et_new]);
		expect(events(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
	});
	it('adds template childs in forecast, if template starts within it', () => {
		let et_data = ETD('everyday', 'event at every day', -1, List([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), List([1, 2, 3, 4, 5]), List([1, 2, 3, 4, 5, 6, 7]), '12:30', '2018-05-16', '');
		let et = ET('22', 2, et_data);
		let et_new = ET('22', 4, et_data);
		let child_1_data = ED('everyday', 'event at every day', '2018-05-16', '12:30');
		let child_2_data = ED('everyday', 'event at every day', '2018-05-17', '12:30');
		let child_1 = E('42', '22', child_1_data);
		let child_2 = E('42', '22', child_2_data);
		let initial = S([NCE('2018-05-01')], [NCET, et]);
		let final = S([NCE('2018-05-10'), child_1, child_2], [NCET, et_new]);
		expect(events(initial, '2018-05-01', '2018-05-10', updateDate(), () => '42')).toEqual(final);
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
		let initial = S([NCE('2018-05-01'), et_old_child], [NCET, et_mod]);
		let final = S([NCE('2018-05-01'), et_new_child_1, et_new_child_2, et_new_child_3], [NCET, et_saved]);
		expect(events(initial, '2018-05-01', '2018-05-10', saveEventTemplate('3'), mockfn)).toEqual(final);
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
		let initial = S([NCE('2018-05-01')], [et_new]);
		let final = S([NCE('2018-05-01'), et_child_1, et_child_2, et_child_3], [NCET, et_new_saved]);
		expect(events(initial, '2018-05-01', '2018-05-10', saveEventTemplate('new'), mockfn)).toEqual(final);
	});
	it('does not sum n from before and from after modification', () => {
		let freshData = ETD('a', 'b', 2, List([3, 4]), List([1, 2, 3, 4, 5]), List([1, 2, 3, 4, 5, 6, 7]), '12:00', '2010-01-01', '2999-12-31');
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
		let initial = S([NCE('2018-05-01'), et_fresh_child_1, et_fresh_child_2], [NCET, et_fresh_mod]);
		let final = S([NCE('2018-05-01'), et_fresh_child_1, et_fresh_child_2, et_fresh_child_3], [NCET, et_fresh_saved]);
		expect(events(initial, '2018-05-01', '2018-05-10', saveEventTemplate('3'), mockfn)).toEqual(final);
	});
	it('does not alter state, when given id is not found', () => {
		let data_old_child = ED('a', 'b', '2018-05-11', '12:00');
		let et_old_child = E('55', '3', data_old_child);
		let cleanData = ETD('', '', 0, List(), List(), List(), '', '', '');
		let newData = ETD('c', 'd', 3, List([3, 4]), List(), List([12, 13, 14, 15, 16, 17]), '22:00', '2010-01-01', '2019-01-01');
		let et_new = ET_('new', 0, newData, cleanData);
		let after = ETD('c', 'd', 10, List([3, 4]), List(), List([12, 13, 14, 15, 16, 17]), '22:00', '2010-01-01', '2019-01-01');
		let et_saved = ET('3', 10, after);
		let initial = S([NCE('2018-05-01'), et_old_child], [et_new, et_saved]);
		expect(events(initial, '2018-05-01', '2018-05-10', saveEventTemplate('1001'), mockfn)).toEqual(initial);
	});
});