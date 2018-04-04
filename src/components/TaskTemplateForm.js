import React from 'react';
import {List, Range} from 'immutable';
import moment from 'moment';
import {connect} from 'react-redux';

import {FlexContainer, Section, Subsection} from '../sc/container';
import {Header} from '../sc/texts';
import Textinput from '../sc/Textinput';
import {TextButton, Selector} from '../sc/textbuttons';
import {DAY_CHANGE_HOUR} from '../utils/constants';
import history from '../utils/history';
import {
  updateTaskTemplateSummary,
  updateTaskTemplateDescription,
  updateTaskTemplateN,
  toggleTaskTemplateMonth,
  toggleTaskTemplateWeek,
  toggleTaskTemplateDay,
  updateTaskTemplateTime,
  updateTaskTemplateStart,
  updateTaskTemplateEnd,
  saveTaskTemplate,
  discardTaskTemplate,
  removeTaskTemplate
} from '../redux/taskTemplates.actions';

const RegularitySelector = ({taskTemplate, updateN}) => (
  <Subsection>
      <FlexContainer jc='space-evenly'>
        <Selector
          selected={taskTemplate.getIn(['template', 'n']) === 1}
          onClick={() => updateN(1)}
        >Einmalig</Selector>
        <Selector
          selected={taskTemplate.getIn(['template', 'single']) > 1}
          onClick={() => updateN(99999)}
        >Regelmäßig</Selector>
      </FlexContainer>
    </Subsection>
);

const SingleDateTimeSelector = ({taskTemplate, updateStart, updateTime}) => (
  <Subsection>
    <FlexContainer jc='space-between'>
      <Textinput
        type='date'
        width='60%'
        value={taskTemplate.getIn(['template', 'start'])}
        onChange={e => updateStart(e.target.value)}
      >Datum</Textinput>
      <Textinput
        type='time'
        width='30%'
        value={taskTemplate.getIn(['template', 'time'])}
        onChange={e => updateTime(e.target.value)}
      >Uhrzeit</Textinput>
    </FlexContainer>
  </Subsection>
);

const MonthsSelector = ({taskTemplate, toggleMonth, toggleWeek, toggleDay}) => (
  <Subsection>
    <FlexContainer jc='space-between'>
      <Selector
        width='46px'
        margin='8px 0px 0px 0px'
        square
        selected={taskTemplate.getIn(['template', 'months']).size === 12}
        onClick={() => toggleMonth(List(Range(0, 12)))}
      >Λ</Selector>
      {List(['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']).map((val, index) => {
        return (
          <Selector
            key={index}
            width='46px'
            margin='8px 0px 0px 0px'
            square
            selected={taskTemplate.getIn(['template', 'months']).includes(index)}
            onClick={() => toggleMonth(index)}
          >{val}</Selector>
        );
      })}
    </FlexContainer>
  </Subsection>
);

const WeeksSelector = ({taskTemplate, toggleWeek, toggleDay}) => (
  <Subsection>
    {taskTemplate.getIn(['template', 'months']).size > 0
      ? <FlexContainer jc='space-between' wrap='true'>
        <Selector
          width='46px'
          margin='12px 0px 0px 0px'
          square
          selected={taskTemplate.getIn(['template', 'weeks']).size === 5}
          onClick={() => toggleWeek(List(Range(1, 6)))}
        >Λ</Selector>
        {List(Range(1, 6)).map((val, index) => {
          return (
            <Selector
              key={index}
              width='46px'
              margin='12px 0px 0px 0px'
              square
              selected={taskTemplate.getIn(['template', 'weeks']).includes(val)}
              onClick={() => toggleWeek(index)}
            >{val}.</Selector>
          );
        })}
      </FlexContainer>
      : <FlexContainer jc='space-between' wrap='true'>
        <Selector
          width='46px'
          margin='3px 0px 0px 0px'
          square
          selected={taskTemplate.getIn(['template', 'weeks']).size === 53}
          onClick={() => toggleWeek(List(Range(1, 54)))}
        >Λ</Selector>
        {List(Range(1, 54)).map((val, index) => {
          return (
            <Selector
              key={index}
              width='46px'
              margin='3px 0px 0px 0px'
              square
              selected={taskTemplate.getIn(['template', 'weeks']).includes(val)}
              onClick={() => toggleWeek(index)}
            >w{val}</Selector>
          );
        })}
      </FlexContainer>
    }
  </Subsection>
);

const DaysSelector = ({taskTemplate, toggleDay}) => (
  <Subsection>
    {taskTemplate.getIn(['template', 'weeks']).size > 0
      ? <FlexContainer jc='space-between'>
        <Selector
          width='48px'
          square
          selected={taskTemplate.getIn(['template', 'days']).size === 7}
          onClick={() => toggleDay(List(Range(1, 8)))}
        >Λ</Selector>
        {List(['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']).map((val, index, list) => {
          return (
            <Selector
              key={index}
              width='48px'
              square
              selected={taskTemplate.getIn(['template', 'days']).includes(index + 1)}
              onClick={() => toggleDay(index)}
            >{val}</Selector>
          );
        })}
      </FlexContainer>
      : taskTemplate.getIn(['template', 'months']).size > 0
        ? <FlexContainer jc='space-between' wrap='true'>
          <Selector
            width='46px'
            margin='3px 0px 0px 0px'
            square
            selected={taskTemplate.getIn(['template', 'days']).size === 31}
            onClick={() => toggleDay(List(Range(1, 32)))}
          >Λ</Selector>
          {List(Range(1, 32)).map((val, index) => {
            return (
              <Selector
                key={index}
                width='46px'
                margin='3px 0px 0px 0px'
                square
                selected={taskTemplate.getIn(['template', 'days']).includes(val)}
                onClick={() => toggleDay(index)}
              >{val}</Selector>
            );
          })}
          <Selector width='46px' margin='3px 0px 0px 0px' square invisible></Selector>
          <Selector width='46px' margin='3px 0px 0px 0px' square invisible></Selector>
          <Selector width='46px' margin='3px 0px 0px 0px' square invisible></Selector>
          <Selector width='46px' margin='3px 0px 0px 0px' square invisible></Selector>
        </FlexContainer>
        : [<FlexContainer key='1' jc='space-around'>
          <Textinput
            type='date'
            width='35%'
            value={''}
            onChange={e => toggleDay(moment(e.target.value).dayOfYear())}
          ></Textinput>
          <Selector
            width='48px'
            square
            selected={taskTemplate.getIn(['template', 'days']).size === 
              365 + moment().subtract(DAY_CHANGE_HOUR, 'hours').isLeapYear()}
            onClick={() => toggleDay(List(Range(1,
              366 + moment().subtract(DAY_CHANGE_HOUR, 'hours').isLeapYear())))}
          >Λ</Selector>
        </FlexContainer>,
        <FlexContainer key='2' jc='space-between' wrap='true'>
          {taskTemplate.getIn(['template', 'days']).map((val, index) => {
            return (
              <Selector
                key={index + 3}
                margin='12px 0px 0px 0px'
                selected
                onClick={() => toggleDay(val)}
              >{moment(val, 'DDD').format('MM-DD')}</Selector>
            );
          })}
          {List(Range(0, (6 - taskTemplate.getIn(['template', 'days']).size % 6) % 6))
            .map((val, index) => <Selector
              key={index}
              margin='12px 0px 0px 0px'
              invisible>01-01</Selector>)}
        </FlexContainer>]
    }
  </Subsection>
);

const MultipleDateTimeSelector = ({taskTemplate, updateStart, updateEnd, updateTime}) => (
  <Subsection>
    <FlexContainer jc='space-between'>
      <Textinput
        type='date'
        width='35%'
        value={taskTemplate.getIn(['template', 'start'])}
        onChange={e => updateStart(e.target.value)}
      >Startdatum</Textinput>
      <Textinput
        type='date'
        width='35%'
        value={taskTemplate.getIn(['template', 'end'])}
        onChange={e => updateEnd(e.target.value)}
      >Enddatum</Textinput>
      <Textinput
        type='time'
        width='20%'
        value={taskTemplate.getIn(['template', 'time'])}
        onChange={e => updateTime(e.target.value)}
      >Uhrzeit</Textinput>
    </FlexContainer>
  </Subsection>
);

const SummInput = ({taskTemplate, updateSummary}) => (
  <Subsection>
    <Textinput
      value={taskTemplate.getIn(['template', 'summ'])}
      onChange={e => updateSummary(e.target.value)}
    >Kurzbeschreibung</Textinput>
  </Subsection>
);

const DescInput = ({taskTemplate, updateDescription}) => (
  <Subsection>
    <Textinput
      value={taskTemplate.getIn(['template', 'desc'])}
      onChange={e => updateDescription(e.target.value)}
      >Beschreibung</Textinput>
  </Subsection>
);

const FormButtons = ({taskTemplate, save, discard, del}) => (
  <Subsection>
    <FlexContainer jc='space-evenly'>
      <TextButton
        onClick={() => save(taskTemplate.get('id'))}
      >Speichern</TextButton>
      <TextButton
        padding={8}
        onClick={() => discard(taskTemplate.get('id'))}
      >Abbrechen</TextButton>
      {taskTemplate.get('id') === 'new'
        ? null
        : <TextButton
          padding={8}
          onClick={() => {
            if (window.confirm('Möchten Sie den Eintrag wirklich löschen?')) del(taskTemplate.get('id'));
          }}
        >Löschen</TextButton>
      }
    </FlexContainer>
  </Subsection>
);

const RawTaskForm = ({
  taskTemplate,
  taskTemplateIsNew,
  updateSummary,
  updateDescription,
  updateN,
  toggleMonth,
  toggleWeek,
  toggleDay,
  updateTime,
  updateStart,
  updateEnd,
  save,
  discard,
  del
}) => (
  <Section>
    <Header>{taskTemplateIsNew ? 'Neue Aufgabe' : 'Aufgabe bearbeiten'}</Header>
    <RegularitySelector
      key='1'
      taskTemplate={taskTemplate}
      updateN={updateN}
    />
    {taskTemplate.getIn(['template', 'n'] === 1)
      ? <SingleDateTimeSelector
        key='2'
        taskTemplate={taskTemplate}
        updateStart={updateStart}
        updateTime={updateTime}
      />
      : [
        <MonthsSelector
          key='3'
          taskTemplate={taskTemplate}
          toggleMonth={toggleMonth}
          toggleWeek={toggleWeek}
          toggleDay={toggleDay}
        />,
        <WeeksSelector
          key='4'
          taskTemplate={taskTemplate}
          toggleWeek={toggleWeek}
          toggleDay={toggleDay}
        />,
        <DaysSelector
          key='5'
          taskTemplate={taskTemplate}
          toggleDay={toggleDay}
        />,
        <MultipleDateTimeSelector
          key='6'
          taskTemplate={taskTemplate}
          updateStart={updateStart}
          updateEnd={updateEnd}
          updateTime={updateTime}
        />
      ]
    }
    
    <SummInput taskTemplate={taskTemplate} updateSummary={updateSummary} />
    <DescInput taskTemplate={taskTemplate} updateDescription={updateDescription} />
    <FormButtons taskTemplate={taskTemplate} save={save} discard={discard} del={del} />
  </Section>
);

const mapStateToProps = (state, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    taskTemplate: state.get('taskTemplates').find(x => x.get('id') === id),
    taskTemplateIsNew: id === 'new'
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    updateSummary: value => dispatch(updateTaskTemplateSummary(id, value)),
    updateDescription: value => dispatch(updateTaskTemplateDescription(id, value)),
    updateN: value => dispatch(updateTaskTemplateN(id, value)),
    toggleMonth: value => dispatch(toggleTaskTemplateMonth(id, value)),
    toggleWeek: value => dispatch(toggleTaskTemplateWeek(id, value)),
    toggleDay: value => dispatch(toggleTaskTemplateDay(id, value)),
    updateTime: value => dispatch(updateTaskTemplateTime(id, value)),
    updateStart: value => dispatch(updateTaskTemplateStart(id, value)),
    updateEnd: value => dispatch(updateTaskTemplateEnd(id, value)),
    save: id => {
      dispatch(saveTaskTemplate(id));
      history.push('/');
    },
    discard: id => {
      dispatch(discardTaskTemplate(id));
      history.push('/');
    },
    del: id => {
      dispatch(removeTaskTemplate(id));
      history.push('/');
    }
  };
}

const TaskTemplateForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawTaskForm);

export default TaskTemplateForm;