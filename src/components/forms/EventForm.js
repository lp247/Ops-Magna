import React, {Component} from 'react';
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
import {NewEventHeader, EditEventHeader, modalDeleteText} from '../../utils/translations';
import {ModalYesNo} from '../modals/Modals';

class RawEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // Discard data, when route changes. No effect, if saved before.
  componentWillUnmount() {
    this.props.discard();
  }

  showModal() {
    this.setState({showDeleteModal: true});
  }

  closeModal() {
    this.setState({showDeleteModal: false});
  }

  render() {
    let {
      event,
      header,
      showDelete,
      lang,
      updateSummary,
      updateDescription,
      updateDate,
      updateTime,
      saveExit,
      discardExit,
      delExit
    } = this.props;
    return (
      <Section>
        <ModalYesNo
          show={this.state.showDeleteModal}
          yesAction={delExit}
          noAction={this.closeModal}
          lang={lang}
        >{modalDeleteText[lang]}</ModalYesNo>
        <Header>{header}</Header>
        <DateTimeSelectorGroup entity={event} updateDate={updateDate} updateTime={updateTime} lang={lang} />
        <SummInput entity={event} updateSummary={updateSummary} lang={lang} />
        <DescInput entity={event} updateDescription={updateDescription} lang={lang} />
        <FormButtonGroup showDelete={showDelete} save={saveExit} discard={discardExit} del={this.showModal} lang={lang} />
      </Section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let {id} = ownProps.match.params;
  let lang = state.get('lang');
  return {
    event: state.getIn(['events', 'items']).find(x => x.get('id') === id),
    header: id === 'new' ? NewEventHeader[lang] : EditEventHeader[lang],
    showDelete: id === 'new',
    lang
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    updateSummary: value => dispatch(updateEventSummary(id, value)),
    updateDescription: value => dispatch(updateEventDescription(id, value)),
    updateDate: value => dispatch(updateEventDate(id, value)),
    updateTime: value => dispatch(updateEventTime(id, value)),
    saveExit: () => {
      dispatch(saveEvent(id));
      history.push('/');
    },
    discardExit: () => {
      dispatch(discardEvent(id));
      history.push('/');
    },
    discard: () => discardEvent(id),
    delExit: () => {
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