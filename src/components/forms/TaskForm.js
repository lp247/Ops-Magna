import React from 'react';
import {connect} from 'react-redux';

import Section from '../container/Section';
import Header from '../texts/Header';
import history from '../../utils/history';
import {
  discardTask,
  removeTask,
  saveTask,
  toggleTaskDone,
  updateTaskSummary,
  updateTaskDescription,
  updateTaskDate,
  updateTaskTime
} from '../../redux/actions/tasks.actions';
import DateTimeSelectorGroup from '../inputs/DateTimeSelectorGroup';
import DoneSelector from '../inputs/DoneSelector';
import SummInput from '../inputs/SummInput';
import DescInput from '../inputs/DescInput';
import FormButtonGroup from '../buttons/FormButtonGroup';

const RawTaskForm = ({
  task,
  header,
  showDelete,
  updateSummary,
  updateDescription,
  updateDate,
  updateTime,
  updateDone,
  save,
  discard,
  del
}) => (
  <Section>
    <Header>{header}</Header>
    <DateTimeSelectorGroup entity={task} updateDate={updateDate} updateTime={updateTime} />
    <DoneSelector entity={task} updateDone={updateDone} />
    <SummInput entity={task} updateSummary={updateSummary} />
    <DescInput entity={task} updateDescription={updateDescription} />
    <FormButtonGroup showDelete={showDelete} save={save} discard={discard} del={del} />
  </Section>
);

const mapStateToProps = (state, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    task: state.getIn(['tasks', 'items']).find(x => x.get('id') === id),
    header: id === 'new' ? 'Neue einmalige Aufgabe' : 'Einmalige Aufgabe bearbeiten',
    showDelete: id === 'new'
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    updateSummary: value => dispatch(updateTaskSummary(id, value)),
    updateDescription: value => dispatch(updateTaskDescription(id, value)),
    updateDate: value => dispatch(updateTaskDate(id, value)),
    updateTime: value => dispatch(updateTaskTime(id, value)),
    updateDone: () => dispatch(toggleTaskDone(id)),
    save: () => {
      dispatch(saveTask(id));
      history.push('/');
    },
    discard: () => {
      dispatch(discardTask(id));
      history.push('/');
    },
    del: () => {
      dispatch(removeTask(id));
      history.push('/');
    }
  };
}

const TaskForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawTaskForm);

export default TaskForm;