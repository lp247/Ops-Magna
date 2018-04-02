import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {List} from 'immutable';
import _ from 'lodash';

import {Table, TCell} from '../sc/table';
import {CBButton, PlusButton, OButton, RhombusButton, StarButton} from '../sc/buttons';
import {Input} from '../sc/inputs';
import {Section, Subsection} from '../sc/container';
import {Header} from '../sc/texts';
import {ACCENT_COLOR, ACCENT_COLOR_03, TRANSPARENT} from '../utils/constants';
import getWeekday from '../utils/weekday';
import {toggleEventVisibilityFilter, addEvent} from '../redux/actions';
import Recur from '../utils/Recur';
import {DAY_CHANGE_HOUR, UPCOMING_DAYS} from '../utils/constants';
import history from '../utils/history';
import taresize from '../utils/taresize';

const RawEventList = ({
  currentEvents,
  upcomingEvents,
  allEvents,
  filter,
  editEntry,
  fetHandler,
  toggleFilter
}) => (
  <Section>
    <RhombusButton
      size='24px'
      float='right'
      margin='10px 6px 0 24px'
      weight='thick'
      color={ACCENT_COLOR}
      checked={filter === 'SHOW_ALL'}
      onClick={toggleFilter}
    />
    <Header>Termine</Header>
    <Subsection>
      <Table>
        {filter === 'SHOW_ALL'
          ? <tbody>
            {allEvents.map((entry, index) => {
              return (
                <tr key={index}>
                  <TCell>
                    <CBButton
                      size='16px'
                      vertical={false}
                      color={ACCENT_COLOR}
                    />
                  </TCell>
                  <TCell
                    primary
                    lineThrough={false}
                  >{entry.get('summ')}</TCell>
                  <TCell>
                    <OButton
                      size='16px'
                      color={ACCENT_COLOR}
                      onClick={() => {editEntry(entry.get('id'))}}
                    />
                  </TCell>
                </tr>
              );
            })}
          </tbody>
          : <tbody>
            {currentEvents.map((entry, index) => {
              return (
                <tr key={index}>
                  <TCell>
                    <CBButton
                      size='16px'
                      vertical={entry.get('time') && entry.get('time') < moment().format('HH:mm') ? true : false}
                      color={ACCENT_COLOR}
                    />
                  </TCell>
                  <TCell
                    primary
                    opacity={entry.get('time') && entry.get('time') < moment().format('HH:mm') ? 0.3 : 1.0}
                    lineThrough={entry.get('time') && entry.get('time') < moment().format('HH:mm') ? true : false}
                  >{entry.get('time')
                    ? '[' + entry.get('time') + '] ' + entry.get('summ')
                    : entry.get('summ')
                  }</TCell>
                  <TCell>
                    <OButton
                      size='16px'
                      color={ACCENT_COLOR}
                      onClick={() => {editEntry(entry.get('id'))}}
                    />
                  </TCell>
                </tr>
              );
            })}
            {upcomingEvents.map((entry, index) => {
              return (
                <tr key={index}>
                  <TCell>
                    <StarButton
                      size='16px'
                      color={ACCENT_COLOR_03}
                    />
                  </TCell>
                  <TCell
                    primary
                    opacity={0.3}
                    lineThrough={false}
                  >{entry.get('time')
                    ? '[' + getWeekday(moment(entry.get('date')).isoWeekday()) + ' '
                      + entry.get('date') + ' ' + entry.get('time') + '] ' + entry.get('summ')
                    : '[' + getWeekday(moment(entry.get('date')).isoWeekday()) + ' '
                      + entry.get('date') + '] ' + entry.get('summ')
                  }</TCell>
                  <TCell>
                    <OButton
                      size='16px'
                      color={ACCENT_COLOR_03}
                    />
                  </TCell>
                </tr>
              );
            })}
            <tr>
              <TCell>
                <PlusButton
                  size='16px'
                  color={TRANSPARENT}
                />
              </TCell>
              <TCell primary padding='0px 10px'>
                <Input
                  type='textarea'
                  onChange={e => fetHandler(e)}
                />
              </TCell>
              <TCell>
                <OButton
                  size='16px'
                  color={TRANSPARENT}
                />
              </TCell>
            </tr>
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
    return entries.filter(x => Recur.matches(x.get('data'), moment().subtract(DAY_CHANGE_HOUR, 'hours')));
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
    return events.filter(x => moment().add(UPCOMING_DAYS + 1, 'days').isAfter(x.get('date'))
      && moment().isBefore(x.get('date')));
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
    allEvents: state.get('events'),
    filter: state.get('eventVisibilityFilter'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editEntry: id => history.push('/event/' + id),
    fetHandler: e => {
      if (e.target.value.endsWith('\n')) {
        dispatch(addEvent(
          '',
          _.uniqueId(),
          e.target.value,
          '',
          moment().format('YYYY-MM-DD'),
          ''
        ));
      } else {
        taresize(e.target);
      }
    },
    toggleFilter: () => dispatch(toggleEventVisibilityFilter())
  }
}

const EventList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawEventList);

export default EventList;