import moment from 'moment';

import {UPDATE_DATE} from '../actions/date.actions';
import {DAY_CHANGE_HOUR} from '../../utils/constants';

const date = (state = moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD'), action) => {
	switch (action.type) {
		case UPDATE_DATE: return moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD');
		default: return state;
	}
}

export default date;