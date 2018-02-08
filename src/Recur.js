import moment from 'moment';

class Recur {
  static isvalid(robj) {
    if (!robj.r_months || !robj.r_weeks || !robj.r_days) return false;
    if (robj.r_days.length === 0) return false;
    if (Math.max(...robj.r_months) > 11) return false;
    if (Math.max(...robj.r_weeks) > 52) return false;
    if (Math.max(...robj.r_days) > 366) return false;
    if (Math.min(...robj.r_months) < 0) return false;
    if (Math.min(...robj.r_weeks) < 1) return false;
    if (Math.min(...robj.r_days) < 1) return false;
    if (robj.r_months.length > 0 && Math.max(...robj.r_weeks) > 5) return false;
    if (robj.r_months.length > 0 && robj.r_weeks.length === 0 && Math.max(...robj.r_days) > 31) return false;
    if (robj.r_weeks.length > 0 && Math.max(...robj.r_days) > 7) return false;
    if (robj.r_start > robj.r_end) return false;
    return true;
  }

  static matches(robj, date) {
    if (!Recur.isvalid(robj)) return false;
    
    if (!moment.isMoment()) date = moment(date);

    let months = (robj.r_months.length > 0);
    let weeks = (robj.r_weeks.length > 0);
    let m = (robj.r_months.findIndex(v => v === date.month()) > -1);
    let wom = (robj.r_weeks.findIndex(v => v === Math.ceil(date.date() / 7)) > -1);
    let woy = (robj.r_weeks.findIndex(v => v === date.isoWeek()) > -1);
    let dow = (robj.r_days.findIndex(v => v === date.isoWeekday()) > -1);
    let dom = (robj.r_days.findIndex(v => v === date.date()) > -1);
    let doy = (robj.r_days.findIndex(v => v === date.dayOfYear()) > -1);
    let bet = (date.isBetween(robj.r_start, robj.r_end, 'day', '[]'));

    if (months && weeks && m && wom && dow && bet) return true;
    if (!months && weeks && woy && dow && bet) return true;
    if (months && !weeks && m && dom && bet) return true;
    if (!months && !weeks && doy && bet) return true;
    return false;
  }
}

export default Recur;