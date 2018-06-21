import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {List} from 'immutable';
import {withRouter} from 'react-router';
import {push} from 'react-router-redux';

import CBButton from '../buttons/CBButton';
import OButton from '../buttons/OButton';
import StarButton from '../buttons/StarButton';
import Section from '../container/Section';
import Subsection from '../container/Subsection';
import getWeekday from '../../utils/weekday';
import {
  DAY_CHANGE_HOUR,
  EVENT_FORECAST_DAYS,
  NOTIFICATION_END_MINUTES
} from '../../utils/constants';
import {updateEventSummary, saveEvent} from '../../redux/actions/events.actions';
import {toggleEventDisplay} from '../../redux/actions/showEventTemplates.actions';
import {maplistsort} from '../../utils/sort';
import FastInput from './FastInput';
import TemplateList from './TemplateList';
import BasicSpan from '../texts/BasicSpan';
import GridContainer from '../container/GridContainer';
import {
  NewEventHeaderText,
  NewEventTemplateHeaderText,
  EventListHeaderText,
  showRecButtonText
} from '../../utils/translations';
import ListHeader from './ListHeader';
// import updater from '../../webworker/updater.worker.js';

// // activeNotifications stores all events with an active notification.
// let activeNotifications = List();

// /**
//  * Hide old and create new notifications of current events.
//  * @param {List} events 
//  */
// const manageEventNotifications = (events) => {

//   // Delete old notifications.
//   activeNotifications.map((id, index) => {

//     // Continue ID check of event, if it is still active today.
//     let event = events.find(event => event.get('id') === id);
//     if (event !== undefined) {

//       // Continue ID check of event, if it has a defined time.
//       let date = event.getIn(['data', 'date']);
//       let time = event.getIn(['data', 'time']);
//       if (time) {

//         // Keep ID of event, if it lies in the time slot for notifications.
//         let isToday = date === moment().format('YYYY-MM-DD');
//         let start = moment(date).subtract(NOTIFICATION_START_MINUTES, 'minutes');
//         let end = moment(date).add(NOTIFICATION_END_MINUTES, 'minutes');
//         let isInTimeslot = moment().isBetween(start, end, 'minute', '[]');
//         if (isToday && isInTimeslot) {
//           return id;
//         }
//       }
//     }

//     // If the ID has to be removed, hide related notification and return null.
//     Android.hideNotification(index);
//     return null;

//   });

//   // Create new notifications.
//   events.forEach((event, index) => {

//     // Continue, if the given id is not already in the list of active notifications.
//     let id = event.get('id');
//     if (activeNotifications.indexOf(id) === -1) {

//       // Continue, if the event has a defined time.
//       let date = event.getIn(['data', 'date']);
//       let time = event.getIn(['data', 'time']);
//       if (time) {

//         // Continue, if the event lies in the time slot for notifications.
//         let isToday = date === moment().format('YYYY-MM-DD');
//         let start = moment(date).add(NOTIFICATION_START_MINUTES, 'minutes');
//         let end = moment().subtract(NOTIFICATION_END_MINUTES, 'minutes');
//         let isInTimeslot = moment().isBetween(start, end, 'minute', '[]');
//         if (isToday && isInTimeslot) {

//           // Create a new notification and push id to list of active notifications.
//           let summ = event.getIn(['data', 'summ']);
//           Android.showNotification(summ, time, activeNotifications.size);
//           activeNotifications.push(id);

//         }
//       }
//     }
//   });
// }

const CurrentList = ({events, editEvent, date, time}) => {
  let timeMOM = moment(time, 'HH:mm').subtract(DAY_CHANGE_HOUR, 'hours');
  return events.reduce((accu, event, index) => {
    let eventTime = event.getIn(['data', 'time']);
    let doneEndMOM = moment(eventTime, 'HH:mm')
      .subtract(DAY_CHANGE_HOUR, 'hours')
      .add(NOTIFICATION_END_MINUTES, 'minutes');
    let timestr = '[' + eventTime + ']';
    let summ = event.getIn(['data', 'summ']);
    let id = event.get('id');
    let tid = event.get('tid');
    let done = eventTime && doneEndMOM.isBefore(timeMOM, 'minute');
    let text = eventTime ? timestr + ' ' + summ : summ;
    return accu.push(
      <CBButton key={(index * 3 + 1).toString()} vertical={done} />,
      <BasicSpan key={(index * 3 + 2).toString()} opacity={1 - done * 0.7} lineThrough={done} listtext>{text}</BasicSpan>,
      <OButton key={(index * 3 + 3).toString()} onClick={() => {editEvent(tid || id, !!tid)}} />
    );
  }, List());
}

const UpcomingList = ({events, editEvent, lang}) => {
  return events.reduce((accu, event, index) => {
    let date = event.getIn(['data', 'date']);
    let time = event.getIn(['data', 'time']);
    let weekday = getWeekday(moment(event.getIn(['data', 'date'])).isoWeekday(), true, lang);
    let datetimestr = '[' + weekday + ' ' + date + ' ' + time + ']';
    let datestr = '[' + weekday + ' ' + date + ']';
    let summ = event.getIn(['data', 'summ']);
    let id = event.get('id');
    let tid = event.get('tid');
    let text = time ? datetimestr + ' ' + summ : datestr + ' ' + summ;
    return accu.push(
      <StarButton key={(index * 3 + 1).toString()} />,
      <BasicSpan key={(index * 3 + 2).toString()} opacity={0.6} lineThrough={false} listtext>{text}</BasicSpan>,
      <OButton key={(index * 3 + 3).toString()} onClick={() => {editEvent(tid || id, !!tid)}} />
    );
  }, List());
}

class RawEventList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.minuteUpdate = this.minuteUpdate.bind(this);
  }

  componentDidMount() {
    // updater.addEventListener('message', this.minuteUpdate);
  }

  componentWillUnmount() {
    // updater.removeEventListener('message', this.minuteUpdate);
  }

  minuteUpdate(e) {
    if (e.data === 'UPDATE_MINUTE') {
      this.forceUpdate();
      // manageEventNotifications();
    }
  }

  render () {
    let {
      currentEvents,
      upcomingEvents,
      eventTemplates,
      showTemplates,
      fet,
      date,
      time,
      lang,
      editEvent,
      fetInputHandler,
      fetAddHandler,
      toggleFilter,
      openNewEventForm,
      openNewEventTemplateForm
    } = this.props;
    return (
      <Section>
        <ListHeader
          header={EventListHeaderText[lang]}
          openNewForm={openNewEventForm}
          openNewTemplateForm={openNewEventTemplateForm}
          formText={NewEventHeaderText[lang]}
          templateFormText={NewEventTemplateHeaderText[lang]}
          filterButtonText={showRecButtonText[lang]}
          filterAction={toggleFilter}
          filterActive={showTemplates}
        />
        <Subsection>
          {showTemplates
            ? <GridContainer gtc='16px 1fr 32px' gcg='16px'>
              <TemplateList templates={eventTemplates} edit={editEvent} />
            </GridContainer>
            : <GridContainer gtc='16px 1fr 32px' gcg='16px'>
              <CurrentList key={1} events={currentEvents} editEvent={editEvent} date={date} time={time} />
              <UpcomingList key={2} events={upcomingEvents} editEvent={editEvent} lang={lang} />
              <FastInput key={3} value={fet} inputHandler={fetInputHandler} addHandler={fetAddHandler} />
            </GridContainer>
          }
        </Subsection>
      </Section>
    );
  }
}

/**
 * Get events with date of today.
 * @param {List.<Map>} tasks Tasks.
 */
const getToday = (entries, date) => {
  if (entries.size > 0) {
    return entries.filter(x => x.getIn(['data', 'date']) === date);
  } else {
    return List();
  }
}

/**
 * Get upcoming events in the time between tomorrow and in 'EVENT_FORECAST_DAYS' days.
 * @param {List.<Map>} tasks Tasks.
 */
const getUpcoming = (events, date) => {
  if (events && events.size > 0) {
    return events.filter(x => moment(date)
      .add(EVENT_FORECAST_DAYS + 1, 'days')
      .isAfter(x.getIn(['data', 'date']), 'day')
      && moment(date).isBefore(x.getIn(['data', 'date']), 'day'));
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
    currentEvents: getToday(state.getIn(['events', 'items']).rest(), state.get('date')).sort(maplistsort(['data', 'time'])),
    upcomingEvents: getUpcoming(state.getIn(['events', 'items']).rest(), state.get('date')).sort(maplistsort(['data', 'date'])),
    eventTemplates: state.getIn(['events', 'templates']).rest().sort(maplistsort(['data', 'summ'])),
    showTemplates: state.get('showEventTemplates'),
    fet: state.getIn(['events', 'items', 0, 'tmp', 'summ']),
    date: state.get('date'),
    time: state.get('time'),
    lang: state.get('lang')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editEvent: (id, isTemplateID) => {
      if (isTemplateID) {
        dispatch(push('/et/' + id));
      } else {
        dispatch(push('/e/' + id));
      }
    },
    fetInputHandler: e => {
      if (e.target.value !== '\n') {
        if (e.target.value.endsWith('\n')) {
          dispatch(saveEvent('new'));
        } else {
          dispatch(updateEventSummary('new', e.target.value));
        }
      }
    },
    fetAddHandler: () => {
      dispatch(saveEvent('new'));
    },
    toggleFilter: () => dispatch(toggleEventDisplay()),
    openNewEventForm: () => dispatch(push('/e/new')),
    openNewEventTemplateForm: () => dispatch(push('/et/new'))
  }
}

const EventList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawEventList);

export default withRouter(EventList);