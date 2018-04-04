import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {List} from 'immutable';

import {Table, TCell} from '../sc/table';
import {CBButton, OButton, RhombusButton, StarButton} from '../sc/buttons';
import {Section, Subsection} from '../sc/container';
import {Header} from '../sc/texts';
import getWeekday from '../utils/weekday';
import {DAY_CHANGE_HOUR, UPCOMING_DAYS} from '../utils/constants';
import history from '../utils/history';
import {addEvent} from '../redux/events.actions';
import {updateFET} from '../redux/fastEventText.actions';
import {toggleEventDisplay} from '../redux/showEventTemplates.actions';
import {maplistsort} from '../utils/sort';
import FastInput from './FastInput';
import TemplateList from './TemplateList';

const CurrentList = ({events, editEvent}) => {
  return events.map((event, index) => {
    let date = event.getIn(['data', 'date']);
    let time = event.getIn(['data', 'time']);
    let timestr = '[' + time + ']';
    let summ = event.getIn(['data', 'summ']);
    let id = event.get('id');
    let done = (time && time < moment().format('HH:mm'))
      || date < moment().format('YYYY-MM-DD');
    let text = time ? timestr + ' ' + summ : summ;
    return (
      <tr key={index}>
        <TCell><CBButton size='16px' vertical={done} /></TCell>
        <TCell primary opacity={1 - done * 0.7} lineThrough={done}>{text}</TCell>
        <TCell><OButton size='16px' onClick={() => {editEvent(id, false)}} /></TCell>
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
    let id = event.get('id');
    let text = time ? datetimestr + ' ' + summ : datestr + ' ' + summ;
    return (
      <tr key={index}>
        <TCell><StarButton size='16px' /></TCell>
        <TCell primary opacity={0.3} lineThrough={false}>{text}</TCell>
        <TCell><OButton size='16px' onClick={() => {editEvent(id, false)}} /></TCell>
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
  toggleFilter
}) => (
  <Section>
    <RhombusButton
      size='24px'
      float='right'
      margin='10px 6px 0 24px'
      weight='thick'
      checked={showTemplates}
      onClick={toggleFilter}
    />
    <Header>Termine</Header>
    <Subsection>
      <Table>
        {showTemplates
          ? <tbody><TemplateList templates={eventTemplates} edit={editEvent} /></tbody>
          : <tbody>
            <CurrentList events={currentEvents} editEvent={editEvent} />
            <UpcomingList events={upcomingEvents} editEvent={editEvent} />
            <FastInput value={fet} handler={fetHandler} />
          </tbody>
        }
      </Table>
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
 * Get upcoming events in the time between tomorrow and in 'UPCOMING_DAYS' days.
 * @param {List.<Map>} tasks Tasks.
 */
const getUpcoming = (events) => {
  if (events && events.size > 0) {
    return events.filter(x => moment().add(UPCOMING_DAYS + 1, 'days').isAfter(x.getIn(['data', 'date']))
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
    currentEvents: getToday(state.get('events')),
    upcomingEvents: getUpcoming(state.get('events')),
    eventTemplates: state.get('eventTemplates').sort(maplistsort(['summ'])),
    showTemplates: state.get('showEventTemplates'),
    fet: state.get('fastEventText')
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
      if (e.target.value.endsWith('\n')) {
        let value = e.target.value.slice(0, -1);
        let today = moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD');
        dispatch(addEvent('', value, '', today, ''));
      } else {
        dispatch(updateFET(e.target.value));
      }
    },
    toggleFilter: () => dispatch(toggleEventDisplay())
  }
}

const EventList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawEventList);

export default EventList;