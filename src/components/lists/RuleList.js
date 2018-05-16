import React from 'react';
import {connect} from 'react-redux';

import Table from '../table/Table';
import TCell from '../table/TCell';
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

const CoreList = ({rules, editRule}) => {
  return rules.map((rule, index) => {
    let summ = rule.getIn(['data', 'summ']);
    let id = rule.get('id');
    return (
      <tr key={index}>
        <TCell><CBButton /></TCell>
        <TCell primary>{summ}</TCell>
        <TCell><OButton onClick={() => {editRule(id)}} /></TCell>
      </tr>
    );
  })
}

const RawRuleList = ({
  rules,
  frt,
  lang,
  editRule,
  frtHandler,
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
      <Table>
        <CoreList rules={rules} editRule={editRule} />
        <FastInput value={frt} handler={frtHandler} />
      </Table>
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
    frtHandler: e => {
      if (e.target.value !== '\n') {
        if (e.target.value.endsWith('\n')) {
          dispatch(saveRule('new'));
        } else {
          dispatch(updateRuleSummary('new', e.target.value));
        }
      }
    },
    openNewRuleForm: () => history.push('/r/new')
  }
}

const RuleList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawRuleList);

export default RuleList;