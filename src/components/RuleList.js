import React from 'react';
import {connect} from 'react-redux';

import {Table, TCell} from '../sc/table';
import {CBButton, PlusButton, OButton} from '../sc/buttons';
import {Input} from '../sc/inputs';
import {Section, Subsection} from '../sc/container';
import {Header} from '../sc/texts';
import {ACCENT_COLOR} from '../utils/constants';
import {saveRule, updateRuleSummary} from '../redux/actions';
import history from '../utils/history';
import taresize from '../utils/taresize';

const RawRuleList = ({
  entries,
  fastInputObj,
  editEntry,
  fastInputUpdater,
  fastAddEntry
}) => (
  <Section>
    <Header>Regeln</Header>
    <Subsection>
      <Table>
        <tbody>
          {entries.map((entry, index) => {
            return (
              <tr key={index}>
                <TCell>
                  <CBButton
                    size='16px'
                    color={ACCENT_COLOR}
                  />
                </TCell>
                <TCell
                  primary
                >{entry.getIn(['data', 'summ'])}</TCell>
                <TCell>
                  <OButton
                    size='16px'
                    color={ACCENT_COLOR}
                    onClick={() => {editEntry(entry.get('id'))}}
                  />
                </TCell>
              </tr>
            );
          })}
          <tr>
            <TCell>
              <PlusButton
                size='16px'
                color={ACCENT_COLOR}
                onClick={() => {fastAddEntry()}}
              />
            </TCell>
            <TCell primary padding='0px 10px'>
              <Input
                type='textarea'
                value={fastInputObj.getIn(['data', 'summ'])}
                onChange={(e) => {
                  fastInputUpdater(e);
                }}
              />
            </TCell>
            <TCell>
              <OButton
                size='16px'
                color={ACCENT_COLOR}
                onClick={() => {editEntry('new')}}
              />
            </TCell>
          </tr>
        </tbody>
      </Table>
    </Subsection>
  </Section>
);

const mapStateToProps = state => {
  return {
    entries: state.get('rules').rest(),
    fastInputObj: state.getIn(['rules', 0]),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editEntry: id => {
      history.push('/rule/' + id);
    },
    fastInputUpdater: e => {
      if (e.target.value.endsWith('\n')) {
        dispatch(saveRule('new'));
      } else {
        dispatch(updateRuleSummary(e.target.value));
        taresize(e.target);
      }
    },
    fastAddEntry: () => {
      dispatch(saveRule('new'));
    }
  }
}

const RuleList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawRuleList);

export default RuleList;