import _ from 'lodash';
import moment from 'moment';
import {DAY_CHANGE_HOUR} from '../../utils/constants';

export const UPDATE_LAST_UPDATE = 'UPDATE_LAST_UPDATE';

export function updateLastUpdate(today = moment().subtract(DAY_CHANGE_HOUR, 'hours'), idGenerator = _.uniqueId) {
	return {type: UPDATE_LAST_UPDATE, today, idGenerator};
}