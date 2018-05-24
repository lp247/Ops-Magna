import React, {Component} from 'react';
import {connect} from 'react-redux';

import Section from '../container/Section';
import Header from '../texts/Header';
import history from '../../utils/history';
import {
  discardTask,
  removeTask,
  saveTask,
  toggleTaskDone,
  updateTaskSummary,
  updateTaskDescription,
  updateTaskDate,
  updateTaskTime
} from '../../redux/actions/tasks.actions';
import DateTimeSelectorGroup from '../inputs/DateTimeSelectorGroup';
import DoneSelector from '../inputs/DoneSelector';
import SummInput from '../inputs/SummInput';
import DescInput from '../inputs/DescInput';
import FormButtonGroup from '../buttons/FormButtonGroup';
import {ModalYesNo, ModalOK} from '../modals/Modals';
import { modalDeleteText, modalEmptyDate, modalEmptySumm, NewTaskHeaderText, EditTaskHeaderText } from '../../utils/translations';

class RawTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
      showEmptyDateModal: false,
      showEmptySummModal: false
    };
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.openEmptyDateModal = this.openEmptyDateModal.bind(this);
    this.closeEmptyDateModal = this.closeEmptyDateModal.bind(this);
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

  openEmptyDateModal() {
    this.setState({showEmptyDateModal: true});
  }

  closeEmptyDateModal() {
    this.setState({showEmptyDateModal: false});
  }

  openEmptySummModal() {
    this.setState({showEmptySummModal: true});
  }

  closeEmptySummModal() {
    this.setState({showEmptySummModal: false});
  }

  checkSaveExit(date, summ) {
    if (!date) {
      this.openEmptyDateModal();
    } else if (!summ) {
      this.openEmptySummModal();
    } else {
      this.props.saveExit();
    }
  }

  render() {
    let {
      task,
      header,
      showDelete,
      lang,
      updateSummary,
      updateDescription,
      updateDate,
      updateTime,
      updateDone,
      // saveExit,
      discardExit,
      delExit
    } = this.props;
    let date = task.getIn(['tmp', 'date']);
    let summ = task.getIn(['tmp', 'summ']);
    return (
      <Section>
        <ModalYesNo
          show={this.state.showDeleteModal}
          yesAction={delExit}
          noAction={this.closeDeleteModal}
          lang={lang}
        >{modalDeleteText[lang]}</ModalYesNo>
        <ModalOK
          show={this.state.showEmptyDateModal}
          okAction={this.closeEmptyDateModal}
          lang={lang}
        >{modalEmptyDate[lang]}</ModalOK>
        <ModalOK
          show={this.state.showEmptySummModal}
          okAction={this.closeEmptySummModal}
          lang={lang}
        >{modalEmptySumm[lang]}</ModalOK>
        <Header>{header}</Header>
        <DateTimeSelectorGroup entity={task} updateDate={updateDate} updateTime={updateTime} lang={lang} />
        <DoneSelector entity={task} updateDone={updateDone} />
        <SummInput entity={task} updateSummary={updateSummary} lang={lang} />
        <DescInput entity={task} updateDescription={updateDescription} lang={lang} />
        <FormButtonGroup
          showDelete={showDelete}
          save={() => this.checkSaveExit(date, summ)}
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
    task: state.getIn(['tasks', 'items']).find(x => x.get('id') === id),
    header: id === 'new' ? NewTaskHeaderText[lang] : EditTaskHeaderText[lang],
    showDelete: id === 'new',
    lang
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    updateSummary: value => dispatch(updateTaskSummary(id, value)),
    updateDescription: value => dispatch(updateTaskDescription(id, value)),
    updateDate: value => dispatch(updateTaskDate(id, value)),
    updateTime: value => dispatch(updateTaskTime(id, value)),
    updateDone: () => dispatch(toggleTaskDone(id)),
    saveExit: () => {
      dispatch(saveTask(id));
      history.push('/');
    },
    discardExit: () => {
      dispatch(discardTask(id));
      history.push('/');
    },
    discard: () => dispatch(discardTask(id)),
    delExit: () => {
      dispatch(removeTask(id));
      history.push('/');
    }
  };
}

const TaskForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawTaskForm);

export default TaskForm;