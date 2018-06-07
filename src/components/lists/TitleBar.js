import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectLanguage} from '../../redux/actions/lang.actions';
import TextButton from '../buttons/TextButton';
import {langButtonText} from '../../utils/translations';
import TitleContainer from '../container/TitleContainer';
import DropDownList from './DropDownList';

class RawTitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDown: false
    };
    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  toggleDropDown() {
    this.setState({showDropDown: !this.state.showDropDown});
  }

  clickLang(lang) {
    this.props.selectLang(lang);
    this.setState({showDropDown: false});
  }

  render() {
    return (
      <TitleContainer>
        <DropDownList
          ButtonComponent={
            <TextButton
              inverted={!this.state.showDropDown}
              onClick={this.toggleDropDown}
            >{langButtonText[this.props.lang]}</TextButton>
          }
          show={this.state.showDropDown}
        >
          <TextButton onClick={() => this.clickLang('en')}>EN</TextButton>
          <TextButton onClick={() => this.clickLang('de')}>DE</TextButton>
          <TextButton onClick={() => this.clickLang('es')}>ES</TextButton>
        </DropDownList>
      </TitleContainer>
    );
  }
}

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
    selectLang: (lang) => dispatch(selectLanguage(lang))
  };
}

const TitleBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawTitleBar);

export default TitleBar;