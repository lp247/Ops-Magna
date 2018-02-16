import moment from 'moment';

function InvalidRecurException(msg) {
  this.message = msg;
  this.name = 'InvalidRecurException';
}

class Recur {
  static isvalid(robj) {
    if (!robj.has('months') || !robj.has('weeks') || !robj.has('days')) return false;
    if (robj.get('days').size === 0 && robj.get('single') === false) return false;
    if (Math.max(...robj.get('months')) > 11) return false;
    if (Math.max(...robj.get('weeks')) > 52) return false;
    if (Math.max(...robj.get('days')) > 366) return false;
    if (Math.min(...robj.get('months')) < 0) return false;
    if (Math.min(...robj.get('weeks')) < 1) return false;
    if (Math.min(...robj.get('days')) < 1) return false;
    if (robj.get('months').size > 0 && Math.max(...robj.get('weeks')) > 5) return false;
    if (robj.get('months').size > 0 && robj.get('weeks').size === 0 && Math.max(...robj.get('days')) > 31) return false;
    if (robj.get('weeks').size > 0 && Math.max(...robj.get('days')) > 7) return false;
    if (robj.get('start') > robj.get('end') && !!robj.get('end')) return false;
    return true;
  }

  static matches(robj, date) {
    if (!Recur.isvalid(robj)) throw new InvalidRecurException('Invalid recur!');
    
    if (!moment.isMoment()) date = moment(date);
    
    if (robj.get('single')) {
      if (date.isSame(robj.get('start'), 'day')) {
        return true;
      } else {
        return false;
      }
    }

    let months = (robj.get('months').size > 0);
    let weeks = (robj.get('weeks').size > 0);
    let m = (robj.get('months').findIndex(v => v === date.month()) > -1);
    let wom = (robj.get('weeks').findIndex(v => v === Math.ceil(date.date() / 7)) > -1);
    let woy = (robj.get('weeks').findIndex(v => v === date.isoWeek()) > -1);
    let dow = (robj.get('days').findIndex(v => v === date.isoWeekday()) > -1);
    let dom = (robj.get('days').findIndex(v => v === date.date()) > -1);
    let doy = (robj.get('days').findIndex(v => v === date.dayOfYear()) > -1);
    let bet = (date.isBetween(robj.get('start'), robj.get('end'), 'day', '[]'));

    if (months && weeks && m && wom && dow && bet) return true;
    if (!months && weeks && woy && dow && bet) return true;
    if (months && !weeks && m && dom && bet) return true;
    if (!months && !weeks && doy && bet) return true;
    return false;
  }
}

export default Recur;