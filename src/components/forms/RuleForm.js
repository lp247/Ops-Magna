import React from 'react';
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
import { NewRuleHeader, EditRuleHeader } from '../../utils/translations';

const RawRuleForm = ({
  rule,
  header,
  showDelete,
  lang,
  updateSummary,
  updateDescription,
  save,
  discard,
  del
}) => (
  <Section>
    <Header>{header}</Header>
    <SummInput entity={rule} updateSummary={updateSummary} lang={lang}/>
    <DescInput entity={rule} updateDescription={updateDescription} lang={lang} />
    <FormButtonGroup showDelete={showDelete} save={save} discard={discard} del={del} lang={lang} />
  </Section>
);

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
    save: () => {
      dispatch(saveRule(id));
      history.push('/');
    },
    discard: () => {
      dispatch(discardRule(id));
      history.push('/');
    },
    del: () => {
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