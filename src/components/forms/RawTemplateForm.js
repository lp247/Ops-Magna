import React, {Component} from 'react';

import Section from '../container/Section';
import Header from '../texts/Header';
import MonthsSelectorGroup from '../inputs/MonthsSelectorGroup';
import WeeksSelectorGroup from '../inputs/WeeksSelectorGroup';
import DaysSelectorGroup from '../inputs/DaysSelectorGroup';
import StartEndTimeSelectorGroup from '../inputs/StartEndTimeSelectorGroup';
import SummInput from '../inputs/SummInput';
import DescInput from '../inputs/DescInput';
import FormButtonGroup from '../buttons/FormButtonGroup';
import NSelectorGroup from '../inputs/NSelectorGroup';
import {modalDeleteText} from '../../utils/translations';
import {ModalYesNo} from '../modals/Modals';

class RawTemplateForm extends Component {
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
      entity,
      header,
      showDelete,
      lang,
      updateSummary,
      updateDescription,
      updateN,
      toggleMonth,
      toggleWeek,
      toggleDay,
      updateTime,
      updateStart,
      updateEnd,
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
        <MonthsSelectorGroup
          entity={entity}
          toggleMonth={toggleMonth}
          toggleWeek={toggleWeek}
          toggleDay={toggleDay}
          lang={lang}
        />
        <WeeksSelectorGroup
          entity={entity}
          toggleWeek={toggleWeek}
          toggleDay={toggleDay}
        />
        <DaysSelectorGroup
          entity={entity}
          toggleDay={toggleDay}
        />
        <StartEndTimeSelectorGroup
          entity={entity}
          updateStart={updateStart}
          updateEnd={updateEnd}
          updateTime={updateTime}
          lang={lang}
        />
        <NSelectorGroup
          entity={entity}
          updateN={updateN}
          lang={lang}
        />
        <SummInput entity={entity} updateSummary={updateSummary} lang={lang} />
        <DescInput entity={entity} updateDescription={updateDescription} lang={lang} />
        <FormButtonGroup showDelete={showDelete} save={saveExit} discard={discardExit} del={this.showModal} lang={lang} />
      </Section>
    );
  }
}

export default RawTemplateForm;