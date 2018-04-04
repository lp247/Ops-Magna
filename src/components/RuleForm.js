import React from 'react';
import {connect} from 'react-redux';

import {FlexContainer, Section, Subsection} from '../sc/container.js';
import {Header} from '../sc/texts.js';
import Textinput from '../sc/Textinput.js';
import {TextButton} from '../sc/textbuttons.js';
import history from '../utils/history.js';
import {
	updateRuleSummary,
	updateRuleDescription,
	saveRule,
	discardRule,
	removeRule
} from '../redux/rules.actions.js';

const SummInput = ({rule, updateSummary}) => (
  <Subsection>
    <Textinput
      value={rule.getIn(['template', 'summ'])}
      onChange={e => updateSummary(e.target.value)}
    >Kurzbeschreibung</Textinput>
  </Subsection>
);

const DescInput = ({rule, updateDescription}) => (
  <Subsection>
    <Textinput
      value={rule.getIn(['template', 'desc'])}
      onChange={e => updateDescription(e.target.value)}
      >Beschreibung</Textinput>
  </Subsection>
);

const FormButtons = ({rule, save, discard, del}) => (
  <Subsection>
    <FlexContainer jc='space-evenly'>
      <TextButton
        onClick={() => save(rule.get('id'))}
      >Speichern</TextButton>
      <TextButton
        padding={8}
        onClick={() => discard(rule.get('id'))}
      >Abbrechen</TextButton>
      {rule.get('id') === 'new'
        ? null
        : <TextButton
          padding={8}
          onClick={() => {
            if (window.confirm('Möchten Sie den Eintrag wirklich löschen?')) del(rule.get('id'));
          }}
        >Löschen</TextButton>
      }
    </FlexContainer>
  </Subsection>
);

const RawRuleForm = ({
  rule,
  ruleIsNew,
  updateSummary,
  updateDescription,
  save,
  discard,
  del
}) => (
  <Section>
    <Header>{ruleIsNew ? 'Neue Regel' : 'Regel bearbeiten'}</Header>
    <SummInput rule={rule} updateSummary={updateSummary} />
    <DescInput rule={rule} updateDescription={updateDescription} />
    <FormButtons rule={rule} save={save} discard={discard} del={del} />
  </Section>
);

const mapStateToProps = (state, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    rule: state.get('rules').find(x => x.get('id') === id),
    ruleIsNew: id === 'new'
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let {id} = ownProps.match.params;
  return {
    updateSummary: value => dispatch(updateRuleSummary(id, value)),
    updateDescription: value => dispatch(updateRuleDescription(id, value)),
    save: id => {
      dispatch(saveRule(id));
      history.push('/');
    },
    discard: id => {
      dispatch(discardRule(id));
      history.push('/');
    },
    del: id => {
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