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
import {modalDeleteText, modalEmptySumm} from '../../utils/translations';
import {ModalYesNo, ModalOK} from '../modals/Modals';

class RawTemplateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
      showEmptySummModal: false
    };
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
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
      // saveExit,
      discardExit,
      delExit
    } = this.props;
    let summ = entity.getIn(['tmp', 'summ']);
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

export default RawTemplateForm;