import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {List} from 'immutable';

import Table from '../table/Table';
import TCell from '../table/TCell';
import CBButton from '../buttons/CBButton';
import OButton from '../buttons/OButton';
import RhombusButton from '../buttons/RhombusButton';
import StarButton from '../buttons/StarButton';
import Section from '../container/Section';
import Subsection from '../container/Subsection';
import Header from '../texts/Header';
import getWeekday from '../../utils/weekday';
import {DAY_CHANGE_HOUR, EVENT_FORECAST_DAYS} from '../../utils/constants';
import history from '../../utils/history';
import {updateEventSummary, updateEventDate, saveEvent} from '../../redux/actions/events.actions';
import {toggleEventDisplay} from '../../redux/actions/showEventTemplates.actions';
import {maplistsort} from '../../utils/sort';
import FastInput from './FastInput';
import TemplateList from './TemplateList';
import MoonButton from '../buttons/MoonButton';
import SunButton from '../buttons/SunButton';

const CurrentList = ({events, editEvent}) => {
  return events.map((event, index) => {
    let date = event.getIn(['data', 'date']);
    let time = event.getIn(['data', 'time']);
    let timestr = '[' + time + ']';
    let summ = event.getIn(['data', 'summ']);
    let id = event.get('tid') || event.get('id');
    let hastid = !!event.get('tid');
    let done = (time && time < moment().format('HH:mm')) || date < moment().format('YYYY-MM-DD');
    let text = time ? timestr + ' ' + summ : summ;
    return (
      <tr key={index}>
        <TCell><CBButton vertical={done} /></TCell>
        <TCell primary opacity={1 - done * 0.7} lineThrough={done}>{text}</TCell>
        <TCell><OButton onClick={() => {editEvent(id, hastid)}} /></TCell>
      </tr>
    );
  });
}

const UpcomingList = ({events, editEvent}) => {
  return events.map((event, index) => {
    let date = event.getIn(['data', 'date']);
    let time = event.getIn(['data', 'time']);
    let weekday = getWeekday(moment(event.getIn(['data', 'date'])).isoWeekday(), true);
    let datetimestr = '[' + weekday + ' ' + date + ' ' + time + ']';
    let datestr = '[' + weekday + ' ' + date + ']';
    let summ = event.getIn(['data', 'summ']);
    let id = event.get('tid') || event.get('id');
    let hastid = !!event.get('tid');
    let text = time ? datetimestr + ' ' + summ : datestr + ' ' + summ;
    return (
      <tr key={index}>
        <TCell><StarButton /></TCell>
        <TCell primary opacity={0.3} lineThrough={false}>{text}</TCell>
        <TCell><OButton onClick={() => {editEvent(id, hastid)}} /></TCell>
      </tr>
    );
  });
}

const RawEventList = ({
  currentEvents,
  upcomingEvents,
  eventTemplates,
  showTemplates,
  fet,
  editEvent,
  fetHandler,
  toggleFilter,
  openNewEventForm,
  openNewEventTemplateForm
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
      onClick={openNewEventForm}
    />
    <SunButton
      large
      float='right'
      margin='10px 6px 0 24px'
      onClick={openNewEventTemplateForm}
    />
    <Header>Termine</Header>
    <Subsection>
      {showTemplates
        ? <Table><TemplateList templates={eventTemplates} edit={editEvent} /></Table>
        : <Table>
          <CurrentList key={1} events={currentEvents} editEvent={editEvent} />
          <UpcomingList key={2} events={upcomingEvents} editEvent={editEvent} />
          <FastInput key={3} value={fet} handler={fetHandler} />
        </Table>
      }
    </Subsection>
  </Section>
);

/**
 * Get events with date of today.
 * @param {List.<Map>} tasks Tasks.
 */
const getToday = (entries) => {
  if (entries.size > 0) {
    return entries.filter(x => x.getIn(['data', 'date'])
      === moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD'));
  } else {
    return List();
  }
}

/**
 * Get upcoming events in the time between tomorrow and in 'EVENT_FORECAST_DAYS' days.
 * @param {List.<Map>} tasks Tasks.
 */
const getUpcoming = (events) => {
  if (events && events.size > 0) {
    return events.filter(x => moment().add(EVENT_FORECAST_DAYS + 1, 'days').isAfter(x.getIn(['data', 'date']))
      && moment().isBefore(x.getIn(['data', 'date'])));
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
    currentEvents: getToday(state.getIn(['events', 'items']).rest()),
    upcomingEvents: getUpcoming(state.getIn(['events', 'items']).rest()),
    eventTemplates: state.getIn(['events', 'templates']).rest().sort(maplistsort(['summ'])),
    showTemplates: state.get('showEventTemplates'),
    fet: state.getIn(['events', 'items', 0, 'tmp', 'summ'])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editEvent: (id, isTemplateID) => {
      if (isTemplateID) {
        history.push('/et/' + id);
      } else {
        history.push('/e/' + id);
      }
    },
    fetHandler: e => {
      if (e.target.value !== '\n') {
        if (e.target.value.endsWith('\n')) {
          let today = moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD');
          dispatch(updateEventDate('new', today));
          dispatch(saveEvent('new'));
        } else {
          dispatch(updateEventSummary('new', e.target.value));
        }
      }
    },
    toggleFilter: () => dispatch(toggleEventDisplay()),
    openNewEventForm: () => history.push('/e/new'),
    openNewEventTemplateForm: () => history.push('/et/new')
  }
}

const EventList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawEventList);

export default EventList;