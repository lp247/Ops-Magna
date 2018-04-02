import React from 'react';
import {List, Range} from 'immutable';
import moment from 'moment';
import {connect} from 'react-redux';

import {FlexContainer, Section, Subsection} from '../sc/container';
import {Header} from '../sc/texts';
import {Input} from '../sc/inputs';
import {TextButton, Selector} from '../sc/textbuttons';
import taresize from '../utils/taresize';
import {DAY_CHANGE_HOUR} from '../utils/constants';
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
  removeTaskTemplate,
} from '../redux/actions';
import history from '../utils/history';

// const togglePeriod = (list, value) => {
//   if (List.isList(value)) {
//     if (list.size === value.size) {
//       return List();
//     } else {
//       return value;
//     }
//   } else {
//     if (list.includes(value)) {
//       let index = list.findIndex(v => v === value);
//       return list.delete(index);
//     } else {
//       return list.push(value);
//     }
//   }
// }

const RegularitySelector = ({tt, updateN}) => (
  <Subsection>
      <FlexContainer jc='space-evenly'>
        <Selector
          selected={tt.getIn(['template', 'n']) === 1}
          onClick={() => updateN(1)}
        >Einmalig</Selector>
        <Selector
          selected={tt.getIn(['template', 'single']) > 1}
          onClick={() => updateN(99999)}
        >Regelmäßig</Selector>
      </FlexContainer>
    </Subsection>
);

const SingleDateTimeSelector = ({tt, updateStart, updateTime}) => (
  <Subsection>
    <FlexContainer jc='space-between'>
      <Input
        type='date'
        width='60%'
        value={tt.getIn(['template', 'start'])}
        onChange={e => updateStart(e.target.value)}
      >Datum</Input>
      <Input
        type='time'
        width='30%'
        value={tt.getIn(['template', 'time'])}
        onChange={e => updateTime(e.target.value)}
      >Uhrzeit</Input>
    </FlexContainer>
  </Subsection>
);

const MonthsSelector = ({tt, toggleMonth, toggleWeek, toggleDay}) => (
  <Subsection>
    <FlexContainer jc='space-between'>
      <Selector
        width='46px'
        margin='8px 0px 0px 0px'
        square
        selected={tt.getIn(['template', 'months']).size === 12}
        onClick={() => toggleMonth(List(Range(0, 12)))}
      >Λ</Selector>
      {List(['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']).map((val, index) => {
        return (
          <Selector
            key={index}
            width='46px'
            margin='8px 0px 0px 0px'
            square
            selected={tt.getIn(['template', 'months']).includes(index)}
            onClick={() => toggleMonth(index)}
          >{val}</Selector>
        );
      })}
    </FlexContainer>
  </Subsection>
);

const WeeksSelector = ({tt, toggleWeek, toggleDay}) => (
  <Subsection>
    {tt.getIn(['template', 'months']).size > 0
      ? <FlexContainer jc='space-between' wrap='true'>
        <Selector
          width='46px'
          margin='12px 0px 0px 0px'
          square
          selected={tt.getIn(['template', 'weeks']).size === 5}
          onClick={() => toggleWeek(List(Range(1, 6)))}
        >Λ</Selector>
        {List(Range(1, 6)).map((val, index) => {
          return (
            <Selector
              key={index}
              width='46px'
              margin='12px 0px 0px 0px'
              square
              selected={tt.getIn(['template', 'weeks']).includes(val)}
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
          selected={tt.getIn(['template', 'weeks']).size === 53}
          onClick={() => toggleWeek(List(Range(1, 54)))}
        >Λ</Selector>
        {List(Range(1, 54)).map((val, index) => {
          return (
            <Selector
              key={index}
              width='46px'
              margin='3px 0px 0px 0px'
              square
              selected={tt.getIn(['template', 'weeks']).includes(val)}
              onClick={() => toggleWeek(index)}
            >w{val}</Selector>
          );
        })}
      </FlexContainer>
    }
  </Subsection>
);

const DaysSelector = ({tt, toggleDay}) => (
  <Subsection>
    {tt.getIn(['template', 'weeks']).size > 0
      ? <FlexContainer jc='space-between'>
        <Selector
          width='48px'
          square
          selected={tt.getIn(['template', 'days']).size === 7}
          onClick={() => toggleDay(List(Range(1, 8)))}
        >Λ</Selector>
        {List(['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']).map((val, index, list) => {
          return (
            <Selector
              key={index}
              width='48px'
              square
              selected={tt.getIn(['template', 'days']).includes(index + 1)}
              onClick={() => toggleDay(index)}
            >{val}</Selector>
          );
        })}
      </FlexContainer>
      : tt.getIn(['template', 'months']).size > 0
        ? <FlexContainer jc='space-between' wrap='true'>
          <Selector
            width='46px'
            margin='3px 0px 0px 0px'
            square
            selected={tt.getIn(['template', 'days']).size === 31}
            onClick={() => toggleDay(List(Range(1, 32)))}
          >Λ</Selector>
          {List(Range(1, 32)).map((val, index) => {
            return (
              <Selector
                key={index}
                width='46px'
                margin='3px 0px 0px 0px'
                square
                selected={tt.getIn(['template', 'days']).includes(val)}
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
          <Input
            type='date'
            width='35%'
            value={''}
            onChange={e => toggleDay(moment(e.target.value).dayOfYear())}
          ></Input>
          <Selector
            width='48px'
            square
            selected={tt.getIn(['template', 'days']).size === 
              365 + moment().subtract(DAY_CHANGE_HOUR, 'hours').isLeapYear()}
            onClick={() => toggleDay(List(Range(1,
              366 + moment().subtract(DAY_CHANGE_HOUR, 'hours').isLeapYear())))}
          >Λ</Selector>
        </FlexContainer>,
        <FlexContainer key='2' jc='space-between' wrap='true'>
          {tt.getIn(['template', 'days']).map((val, index) => {
            return (
              <Selector
                key={index + 3}
                margin='12px 0px 0px 0px'
                selected
                onClick={() => toggleDay(val)}
              >{moment(val, 'DDD').format('MM-DD')}</Selector>
            );
          })}
          {List(Range(0, (6 - tt.getIn(['template', 'days']).size % 6) % 6))
            .map((val, index) => <Selector
              key={index}
              margin='12px 0px 0px 0px'
              invisible>01-01</Selector>)}
        </FlexContainer>]
    }
  </Subsection>
);

const MultipleDateTimeSelector = ({tt, updateStart, updateEnd, updateTime}) => (
  <Subsection>
    <FlexContainer jc='space-between'>
      <Input
        type='date'
        width='35%'
        value={tt.getIn(['template', 'start'])}
        onChange={e => updateStart(e.target.value)}
      >Startdatum</Input>
      <Input
        type='date'
        width='35%'
        value={tt.getIn(['template', 'end'])}
        onChange={e => updateEnd(e.target.value)}
      >Enddatum</Input>
      <Input
        type='time'
        width='20%'
        value={tt.getIn(['template', 'time'])}
        onChange={e => updateTime(e.target.value)}
      >Uhrzeit</Input>
    </FlexContainer>
  </Subsection>
);

const SummInput = ({tt, updateSummary}) => (
  <Subsection>
    <Input
      type='text'
      value={tt.getIn(['template', 'summ'])}
      onChange={e => updateSummary(e.target.value)}
    >Kurzbeschreibung</Input>
  </Subsection>
);

const DescInput = ({tt, updateDescription}) => (
  <Subsection>
    <Input
      type='textarea'
      value={tt.getIn(['template', 'desc'])}
      onChange={e => {
        updateDescription(e.target.value);
        taresize(e.target);
      }}
      >Beschreibung</Input>
  </Subsection>
);

const FormButtons = ({tt, save, discard, del}) => (
  <Subsection>
    <FlexContainer jc='space-evenly'>
      <TextButton
        onClick={() => save(tt.get('id'))}
      >Speichern</TextButton>
      <TextButton
        padding={8}
        onClick={() => discard(tt.get('id'))}
      >Abbrechen</TextButton>
      {tt.get('id') === 'new'
        ? null
        : <TextButton
          padding={8}
          onClick={() => {
            if (window.confirm('Möchten Sie den Eintrag wirklich löschen?')) del(tt.get('id'));
          }}
        >Löschen</TextButton>
      }
    </FlexContainer>
  </Subsection>
);

const RawTaskForm = ({
  tt,
  ttIsNew,
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
    <Header>{ttIsNew ? 'Neue Aufgabe' : 'Aufgabe bearbeiten'}</Header>
    <RegularitySelector
      key='1'
      tt={tt}
      updateN={updateN}
    />
    {tt.getIn(['template', 'n'] === 1)
      ? <SingleDateTimeSelector
        key='2'
        tt={tt}
        updateStart={updateStart}
        updateTime={updateTime}
      />
      : [
        <MonthsSelector
          key='3'
          tt={tt}
          toggleMonth={toggleMonth}
          toggleWeek={toggleWeek}
          toggleDay={toggleDay}
        />,
        <WeeksSelector
          key='4'
          tt={tt}
          toggleWeek={toggleWeek}
          toggleDay={toggleDay}
        />,
        <DaysSelector
          key='5'
          tt={tt}
          toggleDay={toggleDay}
        />,
        <MultipleDateTimeSelector
          key='6'
          tt={tt}
          updateStart={updateStart}
          updateEnd={updateEnd}
          updateTime={updateTime}
        />
      ]
    }
    
    <SummInput tt={tt} updateSummary={updateSummary} />
    <DescInput tt={tt} updateDescription={updateDescription} />
    <FormButtons tt={tt} save={save} discard={discard} del={del} />
  </Section>
);

const mapStateToProps = (state, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    tt: state.get('tasks').find(x => x.get('id') === id),
    ttIsNew: id === 'new'
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

const TaskForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawTaskForm);

export default TaskForm;