import {connect} from 'react-redux';
import moment from 'moment';
import {List} from 'immutable';

import {ejectNewEvent, updateEventKey, toggleEventVisibilityFilter} from '../redux/actions';
import EventList from './EventList';
import Recur from '../utils/Recur';
import {DAY_CHANGE_HOUR, UPCOMING_DAYS} from '../utils/constants';
import history from '../utils/history';
import taresize from '../utils/taresize';

const getToday = (entries, filter) => {
  if (entries.size > 0) {
    return entries.filter(x => Recur.matches(x.get('data'), moment().subtract(DAY_CHANGE_HOUR, 'hours')));
  } else {
    return List();
  }
}

const getUpcoming = (events) => {
  let singlefix;
  let startfix;
  let endfix;
  let upcoming = List();
  for (var i = 1; i <= UPCOMING_DAYS; i++) {
    for (var j = 0; j < events.size; j++) {
      if (Recur.matches(events.getIn([j, 'data']), moment().add(i, 'days').subtract(5, 'hours'))) {
        singlefix = events.get(j).setIn(['data', 'single'], true);
        startfix = singlefix.setIn(['data', 'start'], moment().add(i, 'days').subtract(5, 'hours').format('YYYY-MM-DD'));
        endfix = startfix.setIn(['data', 'end'], '2999-12-31');
        upcoming = upcoming.push(endfix);
      }
    }
  }
  return upcoming;
}

const mapStateToProps = state => {
  return {
    currentEntries: getToday(state.get('events'), state.get('eventVisibilityFilter')),
    upcomingEntries: getUpcoming(state.get('events')),
    allEntries: state.get('events').rest(),
    fastInputObj: state.getIn(['events', 0]),
    filter: state.get('eventVisibilityFilter'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editEntry: id => {
      history.push('/event/' + id);
    },
    fastInputUpdater: e => {
      if (e.target.value.endsWith('\n')) {
        dispatch(ejectNewEvent());
      } else {
        dispatch(updateEventKey('new', 'summ', e.target.value));
        taresize(e.target);
      }
    },
    fastAddEntry: () => {
      dispatch(ejectNewEvent());
    },
    toggleFilter: () => {
      dispatch(toggleEventVisibilityFilter());
    }
  }
}

const ConnEventList = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList);

export default ConnEventList;