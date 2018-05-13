import React from 'react';
import {connect} from 'react-redux';

import Section from '../container/Section';
import Header from '../texts/Header';
import history from '../../utils/history';
import {
	updateEventSummary,
	updateEventDescription,
	updateEventDate,
	updateEventTime,
	saveEvent,
	discardEvent,
	removeEvent
} from '../../redux/actions/events.actions';
import SummInput from '../inputs/SummInput';
import DescInput from '../inputs/DescInput';
import FormButtonGroup from '../buttons/FormButtonGroup';
import DateTimeSelectorGroup from '../inputs/DateTimeSelectorGroup';

const RawEventForm = ({
  event,
  header,
  showDelete,
  updateSummary,
  updateDescription,
  updateTime,
  updateDate,
  save,
  discard,
  del
}) => (
  <Section>
    <Header>{header}</Header>
    <DateTimeSelectorGroup entity={event} updateDate={updateDate} updateTime={updateTime} />
    <SummInput entity={event} updateSummary={updateSummary} />
    <DescInput entity={event} updateDescription={updateDescription} />
    <FormButtonGroup showDelete={showDelete} save={save} discard={discard} del={del} />
  </Section>
);

const mapStateToProps = (state, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    event: state.getIn(['events', 'items']).find(x => x.get('id') === id),
    header: id === 'new' ? 'Neuer einmaliger Termin' : 'Einmaligen Termin bearbeiten',
    showDelete: id === 'new'
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    updateSummary: value => dispatch(updateEventSummary(id, value)),
    updateDescription: value => dispatch(updateEventDescription(id, value)),
    updateDate: value => dispatch(updateEventDate(id, value)),
    updateTime: value => dispatch(updateEventTime(id, value)),
    save: () => {
      dispatch(saveEvent(id));
      history.push('/');
    },
    discard: () => {
      dispatch(discardEvent(id));
      history.push('/');
    },
    del: () => {
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