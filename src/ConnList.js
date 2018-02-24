import {connect} from 'react-redux';
import moment from 'moment';
import {List} from 'immutable';

import {toggleTask, ejectNewTask, updateTaskKey, ejectNewEvent, updateEventKey} from './actions';
import EntryList from './EntryList';
import Recur from './Recur';
import {DAY_CHANGE_HOUR} from './constants';
import history from './history';
import taresize from './taresize';

const getVisible = (entries, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return entries;
    case 'SHOW_TODAY':
      if (entries.size > 0) {
        return entries.filter(x => x.get('data').get('id') === 'new' || Recur.matches(x.get('data'), moment().subtract(DAY_CHANGE_HOUR, 'hours')));
      } else {
        return List();
      }
    default:
      return List();
  }
}

const mstp = (type) => {
  const mapStateToProps = state => {
    if (type === 'task') {
      let numCompleted = state.get('tasks').filter(t => t.get('data').get('doneAt').includes(moment().format('YYYY-MM-DD'))).size;
      return {
        entries: getVisible(state.get('tasks'), state.get('taskVisibilityFilter')),
        header: 'Aufgaben (' + numCompleted + '/' + (state.get('tasks').size - 1) + ')'
      }
    } else if (type === 'event') {
      let numCompleted = state.get('events').filter(x => moment().isAfter(x.get('time'))).size;
      return {
        entries: getVisible(state.get('events'), state.get('eventVisibilityFilter')),
        header: 'Termine (' + numCompleted + '/' + (state.get('events').size - 1) + ')'
      }
    }
  }
  return mapStateToProps;
}

const mdtp = (type) => {
  const mapDispatchToProps = dispatch => {
    if (type === 'task') {
      return {
        toggleEntry: id => {
          dispatch(toggleTask(id, moment().format('YYYY-MM-DD')));
        },
        editEntry: id => {
          history.push('/task/' + id);
        },
        fastInputUpdater: e => {
          if (e.target.value.endsWith('\n')) {
            dispatch(ejectNewTask());
          } else {
            dispatch(updateTaskKey('new', 'summ', e.target.value));
            taresize(e.target);
          }
        },
        fastAddEntry: () => {
          dispatch(ejectNewTask());
        }
      }
    } else if (type === 'event') {
      return {
        toggleEntry: null,
        editEntry: id => {
          history.push('/event/' + id);
        },
        fastInputUpdater: e => {
          if (e.target.value.endsWith('\n')) {
            dispatch(ejectNewEvent());
          } else {
            dispatch(updateEventKey('new', 'summ', e.target.value));
          }
        },
        fastAddEntry: () => {
          dispatch(ejectNewEvent());
        }
      }
    }
  }
  return mapDispatchToProps;
}

export const ConnTaskList = connect(
  mstp('task'),
  mdtp('task')
)(EntryList);

export const ConnEventList = connect(
  mstp('event'),
  mdtp('event')
)(EntryList);