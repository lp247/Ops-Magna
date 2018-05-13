import moment from 'moment';

/**
 * Checks, if the months, weeks, days, startDate and endDate is valid data.
 * @param {List} months Available months.
 * @param {List} weeks Available weeks.
 * @param {List} days Available days.
 * @param {string} startDate Date, after which dates are allowed (inclusively).
 * @param {string} endDate Date, before which dates are allowed (inclusively).
 * @returns true, if the given data is valid.
 */
function isValid(months, weeks, days, startDate, endDate, number, counter) {

  // Missing data.
  if (!months || !weeks || !days || !startDate || !endDate) return false;

  // Maximum number of occurences is not reached.
  if (counter >= number) return false;

  // All months are between 0 (January) and 11 (december).
  if (Math.max(...months) > 11) return false;
  if (Math.min(...months) < 0) return false;

  // All weeks are between 1 (first week of year) and 53 (last possible week of year), if no months
  // are set, otherwise between 1 (first week of month) and 5 (last possible week of month).
  if (Math.max(...weeks) > 53 && months.size === 0) return false;
  if (Math.max(...weeks) > 5 && months.size > 0) return false;
  if (Math.min(...weeks) < 1) return false;

  // All days are between 1 (first day of year) and 366 (last day of leap year), if no months and
  // no weeks are set.
  // All days are between 1 (first day of month) and 31 (last possible day of month), if no weeks
  // are set.
  // All days are between 1 (first day of week) and 7 (last day of week) otherwise.
  if (Math.max(...days) > 366 && weeks.size === 0 && months.size === 0) return false;
  if (Math.max(...days) > 31 && weeks.size === 0 && months.size > 0) return false;
  if (Math.max(...days) > 7 && weeks.size > 0) return false;
  if (Math.min(...days) < 1) return false;
  
  // Start date is before end date.
  if (startDate > endDate) return false;

  // Return true, if false has not returned before (all checks have been positive).
  return true;

}

/**
 * Check if the given 'checkDate' is matched by the recurring date data structure.
 * @param {List} months Available months.
 * @param {List} weeks Available weeks.
 * @param {List} days Available days.
 * @param {string} startDate Date, after which dates are allowed (inclusively).
 * @param {string} endDate Date, before which dates are allowed (inclusively).
 * @param {string|moment} checkDate Date to be checked.
 * @returns true, if matched, false if not matched.
 */
function checkRecurDateMatch(months, weeks, days, startDate, endDate, checkDate, number, counter) {

  // Assume standard values for startDate and endDate, if no inputs were given. Default values for
  // the parameters do not work, because the 'empty' values for the dates are empty strings and they
  // override default values.
  let sd = startDate || '2000-01-01';
  let ed = endDate || '2999-12-31';

  // Change checkDate to moment object, if it is not a moment object already.
  if (!moment.isMoment(checkDate)) checkDate = moment(checkDate);

  // Return false, if the given data is not valid.
  if (!isValid(months, weeks, days, sd, ed, number, counter)) return false;

  // Check if 'months' and 'weeks' are empty.
  let monthsNotEmpty = (months.size > 0);
  let weeksNotEmpty = (weeks.size > 0);

  // Check if month of checkDate is in list of months.
  let m = (months.findIndex(v => v === checkDate.month()) > -1);

  // Check if week of month of checkDate is in list of weeks.
  let wom = (weeks.findIndex(v => v === Math.ceil(checkDate.date() / 7)) > -1);

  // Check if week of year of checkDate is in list of weeks.
  let woy = (weeks.findIndex(v => v === checkDate.isoWeek()) > -1);

  // Check if day of week of checkDate is in list of days.
  let dow = (days.findIndex(v => v === checkDate.isoWeekday()) > -1);

  // Check if day of month of checkDate is in list of days.
  let dom = (days.findIndex(v => v === checkDate.date()) > -1);

  // Check if day of year of checkDate is in list of days.
  let doy = (days.findIndex(v => v === checkDate.dayOfYear()) > -1);

  // Check if checkDate is between startDate and endDate (inclusively). Return false if not.
  if (!checkDate.isBetween(sd, ed, 'day', '[]')) return false;

  // Return true, if one of the following is given:
  // 1. 'months' and 'weeks' are not empty. Then 'months' stores the months of the year, 'weeks'
  //    stores the weeks of the month and 'days' stores the days of the week. Return true, if all
  //    three are matched by checkDate.
  // 2. 'months' is empty, 'weeks' not. Then 'weeks' stores the weeks of the year and 'days' stores
  //    the days of the week. Return true, if both are matched by checkDate.
  // 3. 'weeks' is empty, 'months' is not. Then 'months' stores the months of the year and 'days'
  //    stores the days of the month. Return true, if both are matched by checkDate.
  // 4. 'months' and 'weeks' are empty. Then 'days' stores the days of the year. Return true, if
  //    it is matched by checkDate.
  if (monthsNotEmpty && weeksNotEmpty && m && wom && dow) return true;
  if (!monthsNotEmpty && weeksNotEmpty && woy && dow) return true;
  if (monthsNotEmpty && !weeksNotEmpty && m && dom) return true;
  if (!monthsNotEmpty && !weeksNotEmpty && doy) return true;

  // Return false, if none of the previous cases has been matched.
  return false;

}

export default checkRecurDateMatch;