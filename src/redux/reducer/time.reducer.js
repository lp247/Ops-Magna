import moment from 'moment';

import {UPDATE_TIME} from '../actions/time.actions';

const time = (state = moment().format('HH:mm'), action) => {
	switch (action.type) {
		case UPDATE_TIME: return action.time;
		default: return state;
	}
}

export default time;