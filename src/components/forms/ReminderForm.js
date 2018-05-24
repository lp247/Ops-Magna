import React, {Component} from 'react';
import {connect} from 'react-redux';

import Section from '../container/Section';
import Header from '../texts/Header';
import history from '../../utils/history';
import {
	updateReminderSummary,
	updateReminderDescription,
	saveReminder,
	discardReminder,
	removeReminder
} from '../../redux/actions/reminders.actions';
import SummInput from '../inputs/SummInput';
import DescInput from '../inputs/DescInput';
import FormButtonGroup from '../buttons/FormButtonGroup';
import {ModalYesNo, ModalOK} from '../modals/Modals';
import { modalEmptySumm, modalDeleteText, NewReminderHeaderText, EditReminderHeaderText } from '../../utils/translations';

class RawReminderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
      showEmptySummModal: false
    };
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.openEmptySummModal = this.openEmptySummModal.bind(this);
    this.closeEmptySummModal = this.closeEmptySummModal.bind(this);
    this.checkSaveExit = this.checkSaveExit.bind(this);
  }

  // Add an unload event listener to discard the data, if the content gets unloaded. This happens
  // if the url is changed manually and the react lifecycle have no chance to discard the data.
  componentWillMount() {
    window.addEventListener('unload', this.props.discard);
  }

  // When the route changes via react navigation, the lifecycle methods do work. In this case, the
  // previously added event listener has to be removed.
  componentWillUnmount() {
    window.removeEventListener('unload', this.props.discard);
    this.props.discard();
  }

  openDeleteModal() {
    this.setState({showDeleteModal: true});
  }

  closeDeleteModal() {
    this.setState({showDeleteModal: false});
  }

  openEmptySummModal() {
    this.setState({showEmptySummModal: true});
  }

  closeEmptySummModal() {
    this.setState({showEmptySummModal: false});
  }

  checkSaveExit(summ) {
    if (!summ) {
      this.openEmptySummModal();
    } else {
      this.props.saveExit();
    }
  }

  render() {
    let {
      reminder,
      header,
      showDelete,
      lang,
      updateSummary,
      updateDescription,
      // saveExit,
      discardExit,
      delExit
    } = this.props;
    let summ = reminder.getIn(['tmp', 'summ']);
    return (
      <Section>
        <ModalYesNo
          show={this.state.showDeleteModal}
          yesAction={delExit}
          noAction={this.closeDeleteModal}
          lang={lang}
        >{modalDeleteText[lang]}</ModalYesNo>
        <ModalOK
          show={this.state.showEmptySummModal}
          okAction={this.closeEmptySummModal}
          lang={lang}
        >{modalEmptySumm[lang]}</ModalOK>
        <Header>{header}</Header>
        <SummInput entity={reminder} updateSummary={updateSummary} lang={lang}/>
        <DescInput entity={reminder} updateDescription={updateDescription} lang={lang} />
        <FormButtonGroup
          showDelete={showDelete}
          save={() => this.checkSaveExit(summ)}
          discard={discardExit}
          del={this.openDeleteModal}
          lang={lang}
        />
      </Section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let {id} = ownProps.match.params;
  let lang = state.get('lang');
  return {
    reminder: state.getIn(['reminders', 'items']).find(x => x.get('id') === id),
    header: id === 'new' ? NewReminderHeaderText[lang] : EditReminderHeaderText[lang],
    showDelete: id === 'new',
    lang
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    updateSummary: value => dispatch(updateReminderSummary(id, value)),
    updateDescription: value => dispatch(updateReminderDescription(id, value)),
    saveExit: () => {
      dispatch(saveReminder(id));
      history.push('/');
    },
    discardExit: () => {
      dispatch(discardReminder(id));
      history.push('/');
    },
    discard: () => dispatch(discardReminder(id)),
    delExit: () => {
      dispatch(removeReminder(id));
      history.push('/');
    }
  };
}

const ReminderForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawReminderForm);

export default ReminderForm;