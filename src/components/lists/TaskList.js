import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {List} from 'immutable';

import Table from '../table/Table';
import TCell from '../table/TCell';
import CBButton from '../buttons/CBButton';
import OButton from '../buttons/OButton';
import RhombusButton from '../buttons/RhombusButton';
import XButton from '../buttons/XButton';
import Section from '../container/Section';
import Subsection from '../container/Subsection';
import Header from '../texts/Header';
import {DAY_CHANGE_HOUR} from '../../utils/constants';
import history from '../../utils/history';
import {maplistsort} from '../../utils/sort';
import {toggleTaskDone, updateTaskSummary, updateTaskDate, saveTask} from '../../redux/actions/tasks.actions';
import {toggleTaskDisplay} from '../../redux/actions/showTaskTemplates.actions';
import TemplateList from './TemplateList';
import FastInput from './FastInput';
import MoonButton from '../buttons/MoonButton';
import SunButton from '../buttons/SunButton';

const PrevUncompletedList = ({tasks, editTask, toggleTask}) => {
  return tasks.map((task, index) => {
    let summ = task.getIn(['data', 'summ']);
    let id = task.get('tid') || task.get('id');
    let hastid = !!task.get('tid');
    return (
      <tr key={index}>
        <TCell><XButton onClick={() => toggleTask(id)} /></TCell>
        <TCell primary opacity={0.3}>{summ}</TCell>
        <TCell><OButton onClick={() => {editTask(id, hastid)}} />
        </TCell>
      </tr>
    );
  })
}

const CurrentList = ({tasks, editTask, toggleTask}) => {
  return tasks.map((task, index) => {
    let done = task.getIn(['data', 'done']);
    let summ = task.getIn(['data', 'summ']);
    let time = task.getIn(['data', 'time']);
    let timestr = '[' + time + ']';
    let id = task.get('id');
    let tid = task.get('tid');
    let text = time ? timestr + ' ' + summ : summ;
    return (
      <tr key={index}>
        <TCell><CBButton vertical={done} onClick={() => toggleTask(id)} /></TCell>
        <TCell
          primary
          opacity={1 - done * 0.7}
          lineThrough={done}
          onClick={() => toggleTask(id)}
        >{text}</TCell>
        <TCell><OButton onClick={() => {editTask(tid || id, !!tid)}} /></TCell>
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
  toggleFilter,
  openNewTaskForm,
  openNewTaskTemplateForm
}) => (
  <Section>
    <RhombusButton
      large
      float='right'
      margin='10px 6px 0 24px'
      onClick={toggleFilter}
      filled={showTemplates}
    />
    <MoonButton
      large
      float='right'
      margin='10px 6px 0 24px'
      onClick={openNewTaskForm}
    />
    <SunButton
      large
      float='right'
      margin='10px 6px 0 24px'
      onClick={openNewTaskTemplateForm}
    />
    <Header>Aufgaben</Header>
    <Subsection>
      {showTemplates
        ? <Table><TemplateList templates={taskTemplates} edit={editTask} /></Table>
        : <Table>
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
        </Table>
      }
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
    currentTasks: getToday(state.getIn(['tasks', 'items']).rest()).sort(maplistsort(['time'])),
    prevUncompletedTasks: getUncompleted(state.getIn(['tasks', 'items']).rest()),
    taskTemplates: state.getIn(['tasks', 'templates']).rest().sort(maplistsort(['summ'])),
    showTemplates: state.get('showTaskTemplates'),
    ftt: state.getIn(['tasks', 'items', 0, 'tmp', 'summ'])
  }
}

/**
 * Regular mapping of dispatch function to props from redux.
 * @param {func} dispatch Dispatch function.
 */
const mapDispatchToProps = dispatch => {
  return {
    toggleTask: id => {
      dispatch(toggleTaskDone(id));
      dispatch(saveTask(id));
    },
    editTask: (id, isTid) => {
      if (isTid) {
        history.push('/tt/' + id);
      } else {
        history.push('/t/' + id);
      }
    },
    fttHandler: e => {
      if (e.target.value !== '\n') {
        if (e.target.value.endsWith('\n')) {
          let today = moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD');
          dispatch(updateTaskDate('new', today));
          dispatch(saveTask('new'));
        } else {
          dispatch(updateTaskSummary('new', e.target.value));
        }
      }
    },
    toggleFilter: () => dispatch(toggleTaskDisplay()),
    openNewTaskForm: () => history.push('/t/new'),
    openNewTaskTemplateForm: () => history.push('/tt/new')
  }
}

const TaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawTaskList);

export default TaskList;