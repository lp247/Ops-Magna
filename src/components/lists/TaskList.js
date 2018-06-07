import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {List} from 'immutable';
import {withRouter} from 'react-router';
import {push} from 'react-router-redux';

import CBButton from '../buttons/CBButton';
import OButton from '../buttons/OButton';
import Section from '../container/Section';
import Subsection from '../container/Subsection';
import {DAY_CHANGE_HOUR} from '../../utils/constants';
import {maplistsort} from '../../utils/sort';
import {toggleTaskDone, updateTaskSummary, updateTaskDate, saveTask} from '../../redux/actions/tasks.actions';
import {toggleTaskDisplay} from '../../redux/actions/showTaskTemplates.actions';
import TemplateList from './TemplateList';
import FastInput from './FastInput';
import BasicSpan from '../texts/BasicSpan';
import GridContainer from '../container/GridContainer';
import {
  NewTaskHeaderText,
  NewTaskTemplateHeaderText,
  TaskListHeaderText,
  showRecButtonText
} from '../../utils/translations';
import ListHeader from './ListHeader';

const PrevUncompletedList = ({tasks, editTask, toggleTask}) => {
  return tasks.reduce((accu, task, index) => {
    let done = task.getIn(['data', 'done']);
    let summ = task.getIn(['data', 'summ']);
    let id = task.get('id');
    let tid = task.get('tid');
    return accu.push(
      <CBButton
        key={(index * 3 + 1).toString()}
        vertical={done}
        onClick={() => toggleTask(id)}
      />,
      <BasicSpan
        key={(index * 3 + 2).toString()}
        opacity={0.6 - done * 0.3}
        lineThrough={done}
        listtext
        onClick={() => toggleTask(id)}
      >{summ}</BasicSpan>,
      <OButton
        key={(index * 3 + 3).toString()}
        onClick={() => {editTask(tid || id, !!tid)}}
      />
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
    <ListHeader
      header={TaskListHeaderText[lang]}
      openNewForm={openNewTaskForm}
      openNewTemplateForm={openNewTaskTemplateForm}
      formText={NewTaskHeaderText[lang]}
      templateFormText={NewTaskTemplateHeaderText[lang]}
      filterButtonText={showRecButtonText[lang]}
      filterAction={toggleFilter}
      filterActive={showTemplates}
    />
    <Subsection>
      {showTemplates
        ? <GridContainer gtc='16px 1fr 32px' gcg='16px'>
          <TemplateList templates={taskTemplates} edit={editTask} />
        </GridContainer>
        : <GridContainer gtc='16px 1fr 32px' gcg='16px'>
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
    return tasks.filter(x => {
      return moment().subtract(DAY_CHANGE_HOUR, 'hours').isAfter(x.getIn(['data', 'date']), 'day');
    });
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
        dispatch(push('/tt/' + id));
      } else {
        dispatch(push('/t/' + id));
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
    openNewTaskForm: () => dispatch(push('/t/new')),
    openNewTaskTemplateForm: () => dispatch(push('/tt/new'))
  }
}

const TaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawTaskList);

export default withRouter(TaskList);