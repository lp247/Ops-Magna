import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {List} from 'immutable';

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
import {TaskListHeader} from '../../utils/translations';
import BasicSpan from '../texts/BasicSpan';
import GridContainer from '../container/GridContainer';

const PrevUncompletedList = ({tasks, editTask, toggleTask}) => {
  return tasks.reduce((accu, task, index) => {
    let summ = task.getIn(['data', 'summ']);
    let id = task.get('id');
    let tid = task.get('tid');
    return accu.push(
      <XButton key={(index * 3 + 1).toString()} onClick={() => toggleTask(id)} />,
      <BasicSpan key={(index * 3 + 2).toString()} opacity={0.3} listtext>{summ}</BasicSpan>,
      <OButton key={(index * 3 + 3).toString()} onClick={() => {editTask(tid || id, !!tid)}} />
    );
  }, List());
}

const CurrentList = ({tasks, editTask, toggleTask}) => {
  return tasks.reduce((accu, task, index) => {
    let done = task.getIn(['data', 'done']);
    let summ = task.getIn(['data', 'summ']);
    let time = task.getIn(['data', 'time']);
    let timestr = '[' + time + ']';
    let id = task.get('id');
    let tid = task.get('tid');
    let text = time ? timestr + ' ' + summ : summ;
    return accu.push(
      <CBButton
        key={(index * 3 + 1).toString()}
        vertical={done}
        onClick={() => toggleTask(id)}
      />,
      <BasicSpan
        key={(index * 3 + 2).toString()} 
        opacity={1 - done * 0.7}
        lineThrough={done}
        listtext
        onClick={() => toggleTask(id)}
      >{text}</BasicSpan>,
      <OButton
        key={(index * 3 + 3).toString()}
        onClick={() => {editTask(tid || id, !!tid)}}
      />
    );
  }, List());
}

const RawTaskList = ({
  currentTasks,
  prevUncompletedTasks,
  taskTemplates,
  showTemplates,
  ftt,
  lang,
  toggleTask,
  editTask,
  fttInputHandler,
  fttAddHandler,
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
    <Header>{TaskListHeader[lang]}</Header>
    <Subsection>
      {showTemplates
        ? <GridContainer gtc={'40px 1fr 40px'} jc={'space-around'} gar={'32px'}>
          <TemplateList templates={taskTemplates} edit={editTask} />
        </GridContainer>
        : <GridContainer gtc={'40px 1fr 40px'} jc={'space-around'} gar={'32px'}>
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
          <FastInput value={ftt} inputHandler={fttInputHandler} addHandler={fttAddHandler} />
        </GridContainer>
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
    currentTasks: getToday(state.getIn(['tasks', 'items']).rest()).sort(maplistsort(['data', 'time'])),
    prevUncompletedTasks: getUncompleted(state.getIn(['tasks', 'items']).rest()),
    taskTemplates: state.getIn(['tasks', 'templates']).rest().sort(maplistsort(['data', 'summ'])),
    showTemplates: state.get('showTaskTemplates'),
    ftt: state.getIn(['tasks', 'items', 0, 'tmp', 'summ']),
    lang: state.get('lang')
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
    fttInputHandler: e => {
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
    fttAddHandler: () => {
      let today = moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD');
      dispatch(updateTaskDate('new', today));
      dispatch(saveTask('new'));
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