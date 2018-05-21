import React from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';

import CBButton from '../buttons/CBButton';
import OButton from '../buttons/OButton';
import Section from '../container/Section';
import Subsection from '../container/Subsection';
import Header from '../texts/Header';
import history from '../../utils/history';
import {updateRuleSummary, saveRule} from '../../redux/actions/rules.actions';
import FastInput from './FastInput';
import Placeholder from '../buttons/Placeholder';
import MoonButton from '../buttons/MoonButton';
import {RuleListHeader} from '../../utils/translations';
import GridContainer from '../container/GridContainer';
import BasicSpan from '../texts/BasicSpan';

const CoreList = ({rules, editRule}) => {
  return rules.reduce((accu, rule, index) => {
    let summ = rule.getIn(['data', 'summ']);
    let id = rule.get('id');
    return accu.push(
      <CBButton key={(index * 3 + 1).toString()} />,
      <BasicSpan key={(index * 3 + 2).toString()} listtext>{summ}</BasicSpan>,
      <OButton key={(index * 3 + 3).toString()} onClick={() => {editRule(id)}} />
    );
  }, List());
}

const RawRuleList = ({
  rules,
  frt,
  lang,
  editRule,
  frtInputHandler,
  frtAddHandler,
  openNewRuleForm
}) => (
  <Section>
    <Placeholder
      large
      float='right'
      margin='10px 6px 0 24px'
    />
    <MoonButton
      large
      float='right'
      margin='10px 6px 0 24px'
      onClick={openNewRuleForm}
    />
    <Header>{RuleListHeader[lang]}</Header>
    <Subsection>
      <GridContainer gtc={'40px 1fr 40px'} jc={'space-around'} gar={'32px'}>
        <CoreList rules={rules} editRule={editRule} />
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
    rules: state.getIn(['rules', 'items']).rest(),
    frt: state.getIn(['rules', 'items', 0, 'tmp', 'summ']),
    lang: state.get('lang')
  }
}

/**
 * Regular mapping of dispatch function to props from redux.
 * @param {func} dispatch Dispatch function.
 */
const mapDispatchToProps = dispatch => {
  return {
    editRule: id => history.push('/r/' + id),
    frtInputHandler: e => {
      if (e.target.value !== '\n') {
        if (e.target.value.endsWith('\n')) {
          dispatch(saveRule('new'));
        } else {
          dispatch(updateRuleSummary('new', e.target.value));
        }
      }
    },
    frtAddHandler: () => dispatch(saveRule('new')),
    openNewRuleForm: () => history.push('/r/new')
  }
}

const RuleList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawRuleList);

export default RuleList;