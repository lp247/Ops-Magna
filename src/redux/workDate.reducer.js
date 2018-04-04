import moment from 'moment';
import {INCREMENT_WORK_DATE} from './workDate.actions.js';
import {DAY_CHANGE_HOUR} from '../utils/constants.js';

function workDate(state = moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD'), action) {
  switch (action.type) {
    case INCREMENT_WORK_DATE:
      return moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD');
    default:
      return state;
  }
}

export default workDate;