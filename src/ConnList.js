import {connect} from 'react-redux';
import moment from 'moment';
// import autosize from 'autosize';
import {List, Map} from 'immutable';

import {toggleTask, editTask, updateFTT, addTask, newTask, editEvent, addEvent, updateFET, newEvent} from './actions';
import EntryList from './EntryList';
import Recur from './Recur';
import {DAY_CHANGE_HOUR} from './constants';
import history from './history';
import {emptyTask, emptyEvent} from './objects';

const getVisible = (entries, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return entries;
    case 'SHOW_TODAY':
      if (entries.size > 0) {
        // return entries;
        return entries.filter(x => Recur.matches(x, moment().subtract(DAY_CHANGE_HOUR, 'hours')));
      } else {
        return [];
      }
    default:
      return [];
  }
}

const mstp = (type) => {
  const mapStateToProps = state => {
    if (type === 'task') {
      return {
        entries: getVisible(state.tasks, state.taskVisibilityFilter),
        header: 'Aufgaben (' + state.tasks.filter(t => t.get('doneAt').includes(moment().format('YYYY-MM-DD'))).size + '/' + state.tasks.size + ')',
        fastInputText: state.fastTaskText
      }
    } else if (type === 'event') {
      return {
        entries: getVisible(state.events, state.eventVisibilityFilter),
        header: 'Termine (' + state.events.filter(x => moment().isAfter(x.get('time'))).size + '/' + state.events.size + ')',
        fastInputText: state.fastEventText
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
            dispatch(addTask(emptyTask.set('summ', e.target.value.slice(0, -1))));
          } else {
            dispatch(updateFTT(e.target.value));
          }
        },
        fastAddEntry: text => {
          dispatch(addTask(emptyTask.set('summ', text)));
        },
        newEntry: text => {
          dispatch(newTask(text));
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
            dispatch(addEvent(emptyEvent.set('summ', e.target.value.slice(0, -1))));
          } else {
            dispatch(updateFET(e.target.value));
          }
        },
        fastAddEntry: text => {
          dispatch(addEvent(emptyEvent.set('summ', text)));
        },
        newEntry: text => {
          dispatch(newEvent(text));
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