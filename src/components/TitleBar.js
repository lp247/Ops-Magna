import React from 'react';
import {connect} from 'react-redux';
import Section from './container/Section';
import LangButton from './buttons/LangButton';
import {toggleLanguage} from '../redux/actions/lang.actions';

const RawTitleBar = ({
	lang,
	toggleLang
}) => (
  <Section>
		<LangButton onClick={toggleLang}>{lang.toUpperCase()}</LangButton>
  </Section>
);

/**
 * Regular mapping of state to props from redux.
 * @param {Map} state State of application.
 */
const mapStateToProps = state => {
  return {
    lang: state.get('lang')
  };
}

/**
 * Regular mapping of dispatch function to props from redux.
 * @param {func} dispatch Dispatch function.
 */
const mapDispatchToProps = dispatch => {
  return {
		toggleLang: () => dispatch(toggleLanguage())
	};
}

const TitleBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawTitleBar);

export default TitleBar;