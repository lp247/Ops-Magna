import React, {Component} from 'react';
import {connect} from 'react-redux';

import Section from '../container/Section';
import Header from '../texts/Header';
import history from '../../utils/history';
import {
	updateRuleSummary,
	updateRuleDescription,
	saveRule,
	discardRule,
	removeRule
} from '../../redux/actions/rules.actions';
import SummInput from '../inputs/SummInput';
import DescInput from '../inputs/DescInput';
import FormButtonGroup from '../buttons/FormButtonGroup';
import {NewRuleHeader, EditRuleHeader, modalDeleteText} from '../../utils/translations';
import {ModalYesNo} from '../modals/Modals';

class RawRuleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
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
      rule,
      header,
      showDelete,
      lang,
      updateSummary,
      updateDescription,
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
        <SummInput entity={rule} updateSummary={updateSummary} lang={lang}/>
        <DescInput entity={rule} updateDescription={updateDescription} lang={lang} />
        <FormButtonGroup showDelete={showDelete} save={saveExit} discard={discardExit} del={this.showModal} lang={lang} />
      </Section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let {id} = ownProps.match.params;
  let lang = state.get('lang');
  return {
    rule: state.getIn(['rules', 'items']).find(x => x.get('id') === id),
    header: id === 'new' ? NewRuleHeader[lang] : EditRuleHeader[lang],
    showDelete: id === 'new',
    lang
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    updateSummary: value => dispatch(updateRuleSummary(id, value)),
    updateDescription: value => dispatch(updateRuleDescription(id, value)),
    saveExit: () => {
      dispatch(saveRule(id));
      history.push('/');
    },
    discardExit: () => {
      dispatch(discardRule(id));
      history.push('/');
    },
    discard: () => dispatch(discardRule(id)),
    delExit: () => {
      dispatch(removeRule(id));
      history.push('/');
    }
  };
}

const RuleForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawRuleForm);

export default RuleForm;