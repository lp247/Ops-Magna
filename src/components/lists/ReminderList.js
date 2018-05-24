import React from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';

import CBButton from '../buttons/CBButton';
import OButton from '../buttons/OButton';
import Section from '../container/Section';
import Subsection from '../container/Subsection';
import history from '../../utils/history';
import {updateReminderSummary, saveReminder} from '../../redux/actions/reminders.actions';
import FastInput from './FastInput';
import GridContainer from '../container/GridContainer';
import BasicSpan from '../texts/BasicSpan';
import {NewReminderHeaderText, ReminderListHeaderText} from '../../utils/translations';
import ReminderListHeader from './ReminderListHeader';

const CoreList = ({reminders, editReminder}) => {
  return reminders.reduce((accu, reminder, index) => {
    let summ = reminder.getIn(['data', 'summ']);
    let id = reminder.get('id');
    return accu.push(
      <CBButton key={(index * 3 + 1).toString()} />,
      <BasicSpan key={(index * 3 + 2).toString()} listtext>{summ}</BasicSpan>,
      <OButton key={(index * 3 + 3).toString()} onClick={() => {editReminder(id)}} />
    );
  }, List());
}

const RawReminderList = ({
  reminders,
  frt,
  lang,
  editReminder,
  frtInputHandler,
  frtAddHandler,
  openNewReminderForm
}) => (
  <Section>
    <ReminderListHeader
      header={ReminderListHeaderText[lang]}
      openNewForm={openNewReminderForm}
      formText={NewReminderHeaderText[lang]}
    />
    <Subsection>
      <GridContainer gtc='16px 1fr 32px' gcg='16px'>
        <CoreList reminders={reminders} editReminder={editReminder} />
        <FastInput value={frt} inputHandler={frtInputHandler} addHandler={frtAddHandler} />
      </GridContainer>
    </Subsection>
  </Section>
);

/**
 * Regular mapping of state to props from redux.
 * @param {Map} state State of application.
 */
const mapStateToProps = state => {
  return {
    reminders: state.getIn(['reminders', 'items']).rest(),
    frt: state.getIn(['reminders', 'items', 0, 'tmp', 'summ']),
    lang: state.get('lang')
  }
}

/**
 * Regular mapping of dispatch function to props from redux.
 * @param {func} dispatch Dispatch function.
 */
const mapDispatchToProps = dispatch => {
  return {
    editReminder: id => history.push('/r/' + id),
    frtInputHandler: e => {
      if (e.target.value !== '\n') {
        if (e.target.value.endsWith('\n')) {
          dispatch(saveReminder('new'));
        } else {
          dispatch(updateReminderSummary('new', e.target.value));
        }
      }
    },
    frtAddHandler: () => dispatch(saveReminder('new')),
    openNewReminderForm: () => history.push('/r/new')
  }
}

const ReminderList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawReminderList);

export default ReminderList;