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
  updateEventTemplateSummary,
  updateEventTemplateDescription,
  updateEventTemplateN,
  toggleEventTemplateMonth,
  toggleEventTemplateWeek,
  toggleEventTemplateDay,
  updateEventTemplateTime,
  updateEventTemplateStart,
  updateEventTemplateEnd,
  saveEventTemplate,
  discardEventTemplate,
  removeEventTemplate
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

const RegularitySelector = ({et, updateN}) => (
  <Subsection>
      <FlexContainer jc='space-evenly'>
        <Selector
          selected={et.getIn(['template', 'n']) === 1}
          onClick={() => updateN(1)}
        >Einmalig</Selector>
        <Selector
          selected={et.getIn(['template', 'single']) > 1}
          onClick={() => updateN(99999)}
        >Regelmäßig</Selector>
      </FlexContainer>
    </Subsection>
);

const SingleDateTimeSelector = ({et, updateStart, updateTime}) => (
  <Subsection>
    <FlexContainer jc='space-between'>
      <Input
        type='date'
        width='60%'
        value={et.getIn(['template', 'start'])}
        onChange={e => updateStart(e.target.value)}
      >Datum</Input>
      <Input
        type='time'
        width='30%'
        value={et.getIn(['template', 'time'])}
        onChange={e => updateTime(e.target.value)}
      >Uhrzeit</Input>
    </FlexContainer>
  </Subsection>
);

const MonthsSelector = ({et, toggleMonth, toggleWeek, toggleDay}) => (
  <Subsection>
    <FlexContainer jc='space-between'>
      <Selector
        width='46px'
        margin='8px 0px 0px 0px'
        square
        selected={et.getIn(['template', 'months']).size === 12}
        onClick={() => toggleMonth(List(Range(0, 12)))}
      >Λ</Selector>
      {List(['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']).map((val, index) => {
        return (
          <Selector
            key={index}
            width='46px'
            margin='8px 0px 0px 0px'
            square
            selected={et.getIn(['template', 'months']).includes(index)}
            onClick={() => toggleMonth(index)}
          >{val}</Selector>
        );
      })}
    </FlexContainer>
  </Subsection>
);

const WeeksSelector = ({et, toggleWeek, toggleDay}) => (
  <Subsection>
    {et.getIn(['template', 'months']).size > 0
      ? <FlexContainer jc='space-between' wrap='true'>
        <Selector
          width='46px'
          margin='12px 0px 0px 0px'
          square
          selected={et.getIn(['template', 'weeks']).size === 5}
          onClick={() => toggleWeek(List(Range(1, 6)))}
        >Λ</Selector>
        {List(Range(1, 6)).map((val, index) => {
          return (
            <Selector
              key={index}
              width='46px'
              margin='12px 0px 0px 0px'
              square
              selected={et.getIn(['template', 'weeks']).includes(val)}
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
          selected={et.getIn(['template', 'weeks']).size === 53}
          onClick={() => toggleWeek(List(Range(1, 54)))}
        >Λ</Selector>
        {List(Range(1, 54)).map((val, index) => {
          return (
            <Selector
              key={index}
              width='46px'
              margin='3px 0px 0px 0px'
              square
              selected={et.getIn(['template', 'weeks']).includes(val)}
              onClick={() => toggleWeek(index)}
            >w{val}</Selector>
          );
        })}
      </FlexContainer>
    }
  </Subsection>
);

const DaysSelector = ({et, toggleDay}) => (
  <Subsection>
    {et.getIn(['template', 'weeks']).size > 0
      ? <FlexContainer jc='space-between'>
        <Selector
          width='48px'
          square
          selected={et.getIn(['template', 'days']).size === 7}
          onClick={() => toggleDay(List(Range(1, 8)))}
        >Λ</Selector>
        {List(['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']).map((val, index, list) => {
          return (
            <Selector
              key={index}
              width='48px'
              square
              selected={et.getIn(['template', 'days']).includes(index + 1)}
              onClick={() => toggleDay(index)}
            >{val}</Selector>
          );
        })}
      </FlexContainer>
      : et.getIn(['template', 'months']).size > 0
        ? <FlexContainer jc='space-between' wrap='true'>
          <Selector
            width='46px'
            margin='3px 0px 0px 0px'
            square
            selected={et.getIn(['template', 'days']).size === 31}
            onClick={() => toggleDay(List(Range(1, 32)))}
          >Λ</Selector>
          {List(Range(1, 32)).map((val, index) => {
            return (
              <Selector
                key={index}
                width='46px'
                margin='3px 0px 0px 0px'
                square
                selected={et.getIn(['template', 'days']).includes(val)}
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
            onChange={(e) => toggleDay(moment(e.target.value).dayOfYear())}
          ></Input>
          <Selector
            width='48px'
            square
            selected={et.getIn(['template', 'days']).size ===
              365 + moment().subtract(DAY_CHANGE_HOUR, 'hours').isLeapYear()}
            onClick={() => toggleDay(List(Range(1,
              366 + moment().subtract(DAY_CHANGE_HOUR, 'hours').isLeapYear())))}
          >Λ</Selector>
        </FlexContainer>,
        <FlexContainer key='2' jc='space-between' wrap='true'>
          {et.getIn(['template', 'days']).map((val, index) => {
            return (
              <Selector
                key={index + 3}
                margin='12px 0px 0px 0px'
                selected
                onClick={() => toggleDay(val)}
              >{moment(val, 'DDD').format('MM-DD')}</Selector>
            );
          })}
          {List(Range(0, (6 - et.getIn(['template', 'days']).size % 6) % 6))
            .map((val, index) => <Selector key={index} margin='12px 0px 0px 0px' invisible>01-01</Selector>)}
        </FlexContainer>]
    }
  </Subsection>
);

const MultipleDateTimeSelector = ({et, updateStart, updateEnd, updateTime}) => (
  <Subsection>
    <FlexContainer jc='space-between'>
      <Input
        type='date'
        width='35%'
        value={et.getIn(['template', 'start'])}
        onChange={e => updateStart(e.target.value)}
      >Startdatum</Input>
      <Input
        type='date'
        width='35%'
        value={et.getIn(['template', 'end'])}
        onChange={e => updateEnd(e.target.value)}
      >Enddatum</Input>
      <Input
        type='time'
        width='20%'
        value={et.getIn(['template', 'time'])}
        onChange={e => updateTime(e.target.value)}
      >Uhrzeit</Input>
    </FlexContainer>
  </Subsection>
);

const SummInput = ({et, updateSummary}) => (
  <Subsection>
    <Input
      type='text'
      value={et.getIn(['template', 'summ'])}
      onChange={e => updateSummary(e.target.value)}
    >Kurzbeschreibung</Input>
  </Subsection>
);

const DescInput = ({et, updateDescription}) => (
  <Subsection>
    <Input
      type='textarea'
      value={et.getIn(['template', 'desc'])}
      onChange={e => {
        updateDescription(e.target.value);
        taresize(e.target);
      }}
      >Beschreibung</Input>
  </Subsection>
);

const FormButtons = ({et, save, discard, del}) => (
  <Subsection>
    <FlexContainer jc='space-evenly'>
      <TextButton
        onClick={() => save(et.get('id'))}
      >Speichern</TextButton>
      <TextButton
        padding={8}
        onClick={() => discard(et.get('id'))}
      >Abbrechen</TextButton>
      {et.get('id') === 'new'
        ? null
        : <TextButton
          padding={8}
          onClick={() => {
            if (window.confirm('Möchten Sie den Eintrag wirklich löschen?')) del(et.get('id'));
          }}
        >Löschen</TextButton>
      }
    </FlexContainer>
  </Subsection>
);

const RawEventForm = ({
  et,
  etIsNew,
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
    <Header>{etIsNew ? 'Neuer Termin' : 'Termin bearbeiten'}</Header>
    <RegularitySelector
      key='1'
      et={et}
      updateN={updateN}
    />
    {et.getIn(['template', 'n'] === 1)
      ? <SingleDateTimeSelector
        key='2'
        et={et}
        updateStart={updateStart}
        updateTime={updateTime}
      />
      : [
        <MonthsSelector
          key='3'
          et={et}
          toggleMonth={toggleMonth}
          toggleWeek={toggleWeek}
          toggleDay={toggleDay}
        />,
        <WeeksSelector
          key='4'
          et={et}
          toggleWeek={toggleWeek}
          toggleDay={toggleDay}
        />,
        <DaysSelector
          key='5'
          et={et}
          toggleDay={toggleDay}
        />,
        <MultipleDateTimeSelector
          key='6'
          et={et}
          updateStart={updateStart}
          updateEnd={updateEnd}
          updateTime={updateTime}
        />
      ]
    }
    
    <SummInput et={et} updateSummary={updateSummary} />
    <DescInput et={et} updateDescription={updateDescription} />
    <FormButtons et={et} save={save} discard={discard} del={del} />
  </Section>
);

const mapStateToProps = (state, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    et: state.get('events').find(x => x.get('id') === id),
    etIsNew: id === 'new'
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    updateSummary: value => dispatch(updateEventTemplateSummary(id, value)),
    updateDescription: value => dispatch(updateEventTemplateDescription(id, value)),
    updateN: value => dispatch(updateEventTemplateN(id, value)),
    toggleMonth: value => dispatch(toggleEventTemplateMonth(id, value)),
    toggleWeek: value => dispatch(toggleEventTemplateWeek(id, value)),
    toggleDay: value => dispatch(toggleEventTemplateDay(id, value)),
    updateTime: value => dispatch(updateEventTemplateTime(id, value)),
    updateStart: value => dispatch(updateEventTemplateStart(id, value)),
    updateEnd: value => dispatch(updateEventTemplateEnd(id, value)),
    save: id => {
      dispatch(saveEventTemplate(id));
      history.push('/');
    },
    discard:  id => {
      dispatch(discardEventTemplate(id));
      history.push('/');
    },
    del: id => {
      dispatch(removeEventTemplate(id));
      history.push('/');
    }
  };
}

const EventForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawEventForm);

export default EventForm;