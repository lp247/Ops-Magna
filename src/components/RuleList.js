import React from 'react';
import {connect} from 'react-redux';

import {Table, TCell} from '../sc/table';
import {CBButton, OButton} from '../sc/buttons';
import {Section, Subsection} from '../sc/container';
import {Header} from '../sc/texts';
import history from '../utils/history';
import {addRule} from '../redux/rules.actions';
import {updateFRT} from '../redux/fastRuleText.actions';
import FastInput from './FastInput';

const CoreList = ({rules, editRule}) => {
  return rules.map((rule, index) => {
    let summ = rule.getIn(['data', 'summ']);
    let id = rule.get('id');
    return (
      <tr key={index}>
        <TCell><CBButton size='16px' /></TCell>
        <TCell primary>{summ}</TCell>
        <TCell><OButton size='16px' onClick={() => {editRule(id)}} /></TCell>
      </tr>
    );
  })
}

const RawRuleList = ({
  rules,
  frt,
  editRule,
  frtHandler
}) => (
  <Section>
    <Header>Regeln</Header>
    <Subsection>
      <Table>
        <tbody>
          <CoreList rules={rules} editRule={editRule} />
          <FastInput value={frt} handler={frtHandler} />
        </tbody>
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
    rules: state.get('rules'),
    frt: state.get('fastRuleText'),
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
      if (e.target.value.endsWith('\n')) {
        let value = e.target.value.slice(0, -1);
        dispatch(addRule(value, ''));
      } else {
        dispatch(updateFRT(e.target.value));
      }
    }
  }
}

const RuleList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawRuleList);

export default RuleList;