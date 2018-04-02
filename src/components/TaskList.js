import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {List} from 'immutable';
import _ from 'lodash';

import {Table, TCell} from '../sc/table';
import {CBButton, PlusButton, OButton, RhombusButton, XButton} from '../sc/buttons';
import {Input} from '../sc/inputs';
import {Section, Subsection} from '../sc/container';
import {Header} from '../sc/texts';
import {ACCENT_COLOR, ACCENT_COLOR_03, TRANSPARENT} from '../utils/constants';
import {
  toggleTask,
  toggleTaskVisibilityFilter,
  addTask
} from '../redux/actions';
import {DAY_CHANGE_HOUR} from '../utils/constants';
import history from '../utils/history';
import taresize from '../utils/taresize';
import {maplistsort} from '../utils/sort';

const RawTaskList = ({
  currentTasks,
  prevUncompletedTasks,
  allTasks,
  filter,
  toggleEntry,
  editEntry,
  fttHandler,
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
    <Header>Aufgaben</Header>
    <Subsection>
      <Table>
        {filter === 'SHOW_ALL'
          ? <tbody>
            {allTasks.map((entry, index) => {
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
            {prevUncompletedTasks.map((entry, index) => {
              return (
                <tr key={index}>
                  <TCell>
                    <XButton
                      size='16px'
                      color={ACCENT_COLOR_03}
                      onClick={toggleEntry ? () => toggleEntry(entry.get('id')) : null}
                    />
                  </TCell>
                  <TCell
                    primary
                    opacity={0.3}
                  >{entry.get('summ')}</TCell>
                  <TCell>
                    <OButton
                      size='16px'
                      color={ACCENT_COLOR_03}
                      onClick={() => {editEntry(entry.get('id'))}}
                    />
                  </TCell>
                </tr>
              );
            })}
            {currentTasks.map((entry, index) => {
              return (
                <tr key={index}>
                  <TCell>
                    <CBButton
                      size='16px'
                      vertical={toggleEntry ? entry.get('done') : false}
                      color={ACCENT_COLOR}
                      onClick={toggleEntry ? () => toggleEntry(entry.get('id')) : null}
                    />
                  </TCell>
                  <TCell
                    primary
                    opacity={toggleEntry ? entry.get('done') * 0.3 : 1.0}
                    lineThrough={toggleEntry ? entry.get('done') : false}
                    onClick={toggleEntry ? () => toggleEntry(entry.get('id')) : null}
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
                  onChange={(e) => {
                    fttHandler(e);
                  }}
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
 * Get tasks with date of today.
 * @param {List.<Map>} tasks Tasks.
 */
const getToday = (tasks) => {
  if (tasks && tasks.size > 0) {
    return tasks
      .filter(x => moment()
        .subtract(DAY_CHANGE_HOUR, 'hours')
        .format('YYYY-MM-DD') === x.get('date'));
  } else {
    return List();
  }
}

/**
 * Get tasks from previous dates, which have not been done yet.
 * @param {List.<Map>} tasks Tasks.
 */
const getUncompleted = (tasks) => {
  if (tasks && tasks.size > 0) {
    return tasks.filter(x => !x.get('done')
      && moment().subtract(DAY_CHANGE_HOUR, 'hours').isAfter(x.get('date'), 'day'));
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
    currentTasks: getToday(state.get('tasks')).sort(maplistsort(['time'])),
    prevUncompletedTasks: getUncompleted(state.get('tasks')),
    allTasks: state.get('tasks'),
    filter: state.get('taskVisibilityFilter')
  }
}

/**
 * Regular mapping of dispatch function to props from redux.
 * @param {func} dispatch Dispatch function.
 */
const mapDispatchToProps = dispatch => {
  return {
    toggleEntry: id => dispatch(toggleTask(id)),
    editEntry: id => history.push('/task/' + id),
    fttHandler: e => {
      if (e.target.value.endsWith('\n')) {
        dispatch(addTask(
          '',
          _.uniqueId(),
          e.target.value.slice(0, -1),
          '',
          moment().format('YYYY-MM-DD')
        ));
      } else {
        taresize(e.target);
      }
    },
    toggleFilter: () => dispatch(toggleTaskVisibilityFilter())
  }
}

const TaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawTaskList);

export default TaskList;