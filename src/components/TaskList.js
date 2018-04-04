import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {List} from 'immutable';

import {Table, TCell} from '../sc/table';
import {CBButton, OButton, RhombusButton, XButton} from '../sc/buttons';
import {Section, Subsection} from '../sc/container';
import {Header} from '../sc/texts';
import {DAY_CHANGE_HOUR} from '../utils/constants';
import history from '../utils/history';
import {maplistsort} from '../utils/sort';
import {toggleTaskDone, addTask} from '../redux/tasks.actions';
import {updateFTT} from '../redux/fastTaskText.actions';
import {toggleTaskDisplay} from '../redux/showTaskTemplates.actions';
import TemplateList from './TemplateList';
import FastInput from './FastInput';

const PrevUncompletedList = ({tasks, editTask, toggleTask}) => {
  return tasks.map((task, index) => {
    let summ = task.getIn(['data', 'summ']);
    let id = task.get('id');
    return (
      <tr key={index}>
        <TCell><XButton size='16px' onClick={() => toggleTask(id)} /></TCell>
        <TCell primary opacity={0.3}>{summ}</TCell>
        <TCell><OButton size='16px' onClick={() => {editTask(id, false)}} /></TCell>
      </tr>
    );
  })
}

const CurrentList = ({tasks, editTask, toggleTask}) => {
  return tasks.map((task, index) => {
    let done = task.getIn(['data', 'done']);
    let summ = task.getIn(['data', 'summ']);
    let time = task.getIn(['data', 'time']);
    let timestr = '[' + task.getIn(['data', 'time']) + ']';
    let id = task.get('id');
    let text = time ? timestr + ' ' + summ : summ;
    return (
      <tr key={index}>
        <TCell><CBButton size='16px' vertical={done} onClick={() => toggleTask(id)} /></TCell>
        <TCell
          primary
          opacity={1 - done * 0.7}
          lineThrough={done}
          onClick={() => toggleTask(id)}
        >{text}</TCell>
        <TCell><OButton size='16px' onClick={() => {editTask(id, false)}} /></TCell>
      </tr>
    );
  })
}

const RawTaskList = ({
  currentTasks,
  prevUncompletedTasks,
  taskTemplates,
  showTemplates,
  ftt,
  toggleTask,
  editTask,
  fttHandler,
  toggleFilter
}) => (
  <Section>
    <RhombusButton
      size='24px'
      float='right'
      margin='10px 6px 0 24px'
      weight='thick'
      checked={showTemplates}
      onClick={toggleFilter}
    />
    <Header>Aufgaben</Header>
    <Subsection>
      <Table>
        {showTemplates
          ? <tbody><TemplateList templates={taskTemplates} edit={editTask} /></tbody>
          : <tbody>
            <PrevUncompletedList
              tasks={prevUncompletedTasks}
              editTask={editTask}
              toggleTask={toggleTask}
            />
            <CurrentList
              tasks={currentTasks}
              editTask={editTask}
              toggleTask={toggleTask}
            />
            <FastInput value={ftt} handler={fttHandler} />
          </tbody>
        }
      </Table>
    </Subsection>
  </Section>
);

/**
 * Get tasks with date of today.
 * @param {List.<Map>} tasks Tasks.
 */
const getToday = (tasks) => {
  if (tasks && tasks.size > 0) {
    return tasks
      .filter(x => moment()
        .subtract(DAY_CHANGE_HOUR, 'hours')
        .format('YYYY-MM-DD') === x.getIn(['data', 'date']));
  } else {
    return List();
  }
}

/**
 * Get tasks from previous dates, which have not been done yet.
 * @param {List.<Map>} tasks Tasks.
 */
const getUncompleted = (tasks) => {
  if (tasks && tasks.size > 0) {
    return tasks.filter(x => !x.getIn(['data', 'done'])
      && moment().subtract(DAY_CHANGE_HOUR, 'hours').isAfter(x.getIn(['data', 'date']), 'day'));
  } else {
    return List();
  }
}

/**
 * Regular mapping of state to props from redux.
 * @param {Map} state State of application.
 */
const mapStateToProps = state => {
  return {
    currentTasks: getToday(state.get('tasks')).sort(maplistsort(['time'])),
    prevUncompletedTasks: getUncompleted(state.get('tasks')),
    taskTemplates: state.get('taskTemplates').sort(maplistsort(['summ'])),
    showTemplates: state.get('showTaskTemplates'),
    ftt: state.get('fastTaskText')
  }
}

/**
 * Regular mapping of dispatch function to props from redux.
 * @param {func} dispatch Dispatch function.
 */
const mapDispatchToProps = dispatch => {
  return {
    toggleTask: id => dispatch(toggleTaskDone(id)),
    editTask: (id, isTemplateID) => {
      if (isTemplateID) {
        history.push('/tt/' + id);
      } else {
        history.push('/t/' + id);
      }
    },
    fttHandler: e => {
      if (e.target.value.endsWith('\n')) {
        let value = e.target.value.slice(0, -1);
        let today = moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD');
        dispatch(addTask('', value, '', today, ''));
      } else {
        dispatch(updateFTT(e.target.value));
      }
    },
    toggleFilter: () => dispatch(toggleTaskDisplay())
  }
}

const TaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawTaskList);

export default TaskList;