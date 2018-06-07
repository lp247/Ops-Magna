import moment from 'moment';
import {DAY_CHANGE_HOUR} from '../../utils/constants';
import uuidv4 from '../../utils/uuidv4';

export const UPDATE_LAST_UPDATE = 'UPDATE_LAST_UPDATE';

export function updateLastUpdate(today = moment().subtract(DAY_CHANGE_HOUR, 'hours'), idGenerator = uuidv4) {
	return {type: UPDATE_LAST_UPDATE, today, idGenerator};
}