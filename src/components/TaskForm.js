import React from 'react';
import {connect} from 'react-redux';

import {FlexContainer, Section, Subsection} from '../sc/container.js';
import {Header} from '../sc/texts.js';
import Textinput from '../sc/Textinput.js';
import {TextButton, Selector} from '../sc/textbuttons.js';
import history from '../utils/history.js';
import {
  discardTask,
  removeTask,
  saveTask,
  toggleTaskDone,
  updateTaskSummary,
  updateTaskDescription,
  updateTaskDate,
  updateTaskTime
} from '../redux/tasks.actions.js';

const SingleDateTimeSelector = ({task, updateDate, updateTime}) => (
  <Subsection>
    <FlexContainer jc='space-between'>
      <Textinput
        type='date'
        width='60%'
        value={task.getIn(['template', 'start'])}
        onChange={e => updateDate(e.target.value)}
      >Datum</Textinput>
      <Textinput
        type='time'
        width='30%'
        value={task.getIn(['template', 'time'])}
        onChange={e => updateTime(e.target.value)}
      >Uhrzeit</Textinput>
    </FlexContainer>
  </Subsection>
);

const DoneSelector = ({task, updateDone}) => (
  <Subsection>
    <FlexContainer jc='left'>
      <Selector
        selected={task.get('done')}
        onClick={updateDone}
      >{task.get('done') ? 'Erledigt' : 'Nicht erledigt'}</Selector>
    </FlexContainer>
  </Subsection>
);

const SummInput = ({task, updateSummary}) => (
  <Subsection>
    <Textinput
      value={task.getIn(['template', 'summ'])}
      onChange={e => updateSummary(e.target.value)}
    >Kurzbeschreibung</Textinput>
  </Subsection>
);

const DescInput = ({task, updateDescription}) => (
  <Subsection>
    <Textinput
      value={task.getIn(['template', 'desc'])}
      onChange={e => updateDescription(e.target.value)}
      >Beschreibung</Textinput>
  </Subsection>
);

const FormButtons = ({task, save, discard, del}) => (
  <Subsection>
    <FlexContainer jc='space-evenly'>
      <TextButton
        onClick={() => save(task.get('id'))}
      >Speichern</TextButton>
      <TextButton
        padding={8}
        onClick={() => discard(task.get('id'))}
      >Abbrechen</TextButton>
      {task.get('id') === 'new'
        ? null
        : <TextButton
          padding={8}
          onClick={() => {
            if (window.confirm('Möchten Sie den Eintrag wirklich löschen?')) del(task.get('id'));
          }}
        >Löschen</TextButton>
      }
    </FlexContainer>
  </Subsection>
);

const RawTaskForm = ({
  task,
  taskIsNew,
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
    <Header>{taskIsNew ? 'Neue Aufgabe' : 'Aufgabe bearbeiten'}</Header>
    <SingleDateTimeSelector key='2' task={task} updateDate={updateDate} updateTime={updateTime} />
    <DoneSelector task={task} updateDone={updateDone} />
    <SummInput task={task} updateSummary={updateSummary} />
    <DescInput task={task} updateDescription={updateDescription} />
    <FormButtons task={task} save={save} discard={discard} del={del} />
  </Section>
);

const mapStateToProps = (state, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    task: state.get('tasks').find(x => x.get('id') === id),
    taskIsNew: id === 'new'
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
    save: id => {
      dispatch(saveTask(id));
      history.push('/');
    },
    discard: id => {
      dispatch(discardTask(id));
      history.push('/');
    },
    del: id => {
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