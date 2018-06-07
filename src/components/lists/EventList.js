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
import {DAY_CHANGE_HOUR, EVENT_FORECAST_DAYS} from '../../utils/constants';
import {updateEventSummary, updateEventDate, saveEvent} from '../../redux/actions/events.actions';
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
import updater from '../../webworker/updater.worker.js';

const CurrentList = ({events, editEvent}) => {
  return events.reduce((accu, event, index) => {
    let date = event.getIn(['data', 'date']);
    let time = event.getIn(['data', 'time']);
    let timestr = '[' + time + ']';
    let summ = event.getIn(['data', 'summ']);
    let id = event.get('id');
    let tid = event.get('tid');
    let done = (time && time < moment().format('HH:mm')) || date < moment().format('YYYY-MM-DD');
    let text = time ? timestr + ' ' + summ : summ;
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
    updater.addEventListener('message', this.minuteUpdate);
  }

  componentWillUnmount() {
    updater.removeEventListener('message', this.minuteUpdate);
  }

  minuteUpdate(e) {
    if (e.data === 'UPDATE_MINUTE') {
      this.forceUpdate();
    }
  }

  render () {
    let {
      currentEvents,
      upcomingEvents,
      eventTemplates,
      showTemplates,
      fet,
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
              <CurrentList key={1} events={currentEvents} editEvent={editEvent} />
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
    return events.filter(x => moment()
      .subtract(DAY_CHANGE_HOUR, 'hours')
      .add(EVENT_FORECAST_DAYS + 1, 'days')
      .isAfter(x.getIn(['data', 'date']), 'day')
      && moment().subtract(DAY_CHANGE_HOUR, 'hours').isBefore(x.getIn(['data', 'date']), 'day'));
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
    currentEvents: getToday(state.getIn(['events', 'items']).rest()).sort(maplistsort(['data', 'time'])),
    upcomingEvents: getUpcoming(state.getIn(['events', 'items']).rest()).sort(maplistsort(['data', 'date'])),
    eventTemplates: state.getIn(['events', 'templates']).rest().sort(maplistsort(['data', 'summ'])),
    showTemplates: state.get('showEventTemplates'),
    fet: state.getIn(['events', 'items', 0, 'tmp', 'summ']),
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
          let today = moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD');
          dispatch(updateEventDate('new', today));
          dispatch(saveEvent('new'));
        } else {
          dispatch(updateEventSummary('new', e.target.value));
        }
      }
    },
    fetAddHandler: () => {
      let today = moment().subtract(DAY_CHANGE_HOUR, 'hours').format('YYYY-MM-DD');
      dispatch(updateEventDate('new', today));
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