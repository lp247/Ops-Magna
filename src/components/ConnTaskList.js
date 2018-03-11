import {connect} from 'react-redux';
import moment from 'moment';
import {List} from 'immutable';

import {toggleTask, ejectNewTask, updateTaskKey, toggleTaskVisibilityFilter} from '../redux/actions';
import TaskList from './TaskList';
import {DAY_CHANGE_HOUR} from '../utils/constants';
import history from '../utils/history';
import taresize from '../utils/taresize';
import { maplistsort } from '../utils/sort';

const getToday = (entries) => {
  if (entries.size > 0) {
    return entries
      .filter(x => moment()
        .subtract(DAY_CHANGE_HOUR, 'hours')
        .format('YYYY-MM-DD') === x.getIn(['data', 'lastExec', 'date']));
  } else {
    return List();
  }
}

const getUncompleted = (tasks) => {
  return tasks.filter(x => !x.getIn(['data', 'lastExec', 'done']) && moment().subtract(DAY_CHANGE_HOUR, 'hours').isAfter(x.getIn(['data', 'lastExec', 'date']), 'day'));
}

const mapStateToProps = state => {
  return {
    currentEntries: getToday(state.get('tasks')).sort(maplistsort(['data', 'time'])),
    uncompletedEntries: getUncompleted(state.get('tasks')),
    allEntries: state.get('tasks').rest(),
    fastInputObj: state.getIn(['tasks', 0]),
    filter: state.get('taskVisibilityFilter')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleEntry: id => {
      dispatch(toggleTask(id));
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
    },
    toggleFilter: () => {
      dispatch(toggleTaskVisibilityFilter());
    }
  }
}

const ConnTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);

export default ConnTaskList;