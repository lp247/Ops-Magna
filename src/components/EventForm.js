import React from 'react';
import {connect} from 'react-redux';

import {FlexContainer, Section, Subsection} from '../sc/container.js';
import {Header} from '../sc/texts.js';
import Textinput from '../sc/Textinput.js';
import {TextButton} from '../sc/textbuttons.js';
import history from '../utils/history.js';
import {
	updateEventSummary,
	updateEventDescription,
	updateEventDate,
	updateEventTime,
	saveEvent,
	discardEvent,
	removeEvent
} from '../redux/events.actions.js';

const SingleDateTimeSelector = ({event, updateDate, updateTime}) => (
  <Subsection>
    <FlexContainer jc='space-between'>
      <Textinput
        type='date'
        width='60%'
        value={event.getIn(['template', 'start'])}
        onChange={e => updateDate(e.target.value)}
      >Datum</Textinput>
      <Textinput
        type='time'
        width='30%'
        value={event.getIn(['template', 'time'])}
        onChange={e => updateTime(e.target.value)}
      >Uhrzeit</Textinput>
    </FlexContainer>
  </Subsection>
);

const SummInput = ({event, updateSummary}) => (
  <Subsection>
    <Textinput
      value={event.getIn(['template', 'summ'])}
      onChange={e => updateSummary(e.target.value)}
    >Kurzbeschreibung</Textinput>
  </Subsection>
);

const DescInput = ({event, updateDescription}) => (
  <Subsection>
    <Textinput
      value={event.getIn(['template', 'desc'])}
      onChange={e => updateDescription(e.target.value)}
      >Beschreibung</Textinput>
  </Subsection>
);

const FormButtons = ({event, save, discard, del}) => (
  <Subsection>
    <FlexContainer jc='space-evenly'>
      <TextButton
        onClick={() => save(event.get('id'))}
      >Speichern</TextButton>
      <TextButton
        padding={8}
        onClick={() => discard(event.get('id'))}
      >Abbrechen</TextButton>
      {event.get('id') === 'new'
        ? null
        : <TextButton
          padding={8}
          onClick={() => {
            if (window.confirm('Möchten Sie den Eintrag wirklich löschen?')) del(event.get('id'));
          }}
        >Löschen</TextButton>
      }
    </FlexContainer>
  </Subsection>
);

const RawEventForm = ({
  event,
  eventIsNew,
  updateSummary,
  updateDescription,
  updateTime,
  updateDate,
  save,
  discard,
  del
}) => (
  <Section>
    <Header>{eventIsNew ? 'Neuer Termin' : 'Termin bearbeiten'}</Header>
    <SingleDateTimeSelector key='2' event={event} updateDate={updateDate} updateTime={updateTime} />
    <SummInput event={event} updateSummary={updateSummary} />
    <DescInput event={event} updateDescription={updateDescription} />
    <FormButtons event={event} save={save} discard={discard} del={del} />
  </Section>
);

const mapStateToProps = (state, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    event: state.get('events').find(x => x.get('id') === id),
    eventIsNew: id === 'new'
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    updateSummary: value => dispatch(updateEventSummary(id, value)),
    updateDescription: value => dispatch(updateEventDescription(id, value)),
    updateDate: value => dispatch(updateEventDate(id, value)),
    updateTime: value => dispatch(updateEventTime(id, value)),
    save: id => {
      dispatch(saveEvent(id));
      history.push('/');
    },
    discard: id => {
      dispatch(discardEvent(id));
      history.push('/');
    },
    del: id => {
      dispatch(removeEvent(id));
      history.push('/');
    }
  };
}

const EventForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawEventForm);

export default EventForm;