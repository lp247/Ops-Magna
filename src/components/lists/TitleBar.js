import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectLanguage} from '../../redux/actions/lang.actions';
import TextButton from '../buttons/TextButton';
import {langButtonText} from '../../utils/translations';
import TitleContainer from '../container/TitleContainer';
import DropDownList from './DropDownList';

// const RawTitleBar = ({
// 	lang,
// 	selectLang
// }) => (
//   <Section>
//     {/* <LangButton onClick={toggleLang}>{lang.toUpperCase()}</LangButton> */}
//     <DropDownArea>
//       <button onclick="myFunction()">Sprachen</button>
//       <OptionsArea show={true}>
//         <DropDownLink onClick={() => selectLang('en')}>EN</DropDownLink>
//         <DropDownLink onClick={() => selectLang('de')}>DE</DropDownLink>
//         <DropDownLink onClick={() => selectLang('es')}>ES</DropDownLink>
//         <DropDownLink onClick={() => selectLang('ru')}>RU</DropDownLink>
//       </OptionsArea>
//     </DropDownArea> 
//   </Section>
// );

const DropDownButton = ({text, inverted, onClick}) => (
  <TextButton
    onClick={onClick}
    inverted={inverted}
  >{text}</TextButton>
);

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
            <DropDownButton
              text={(langButtonText[this.props.lang])}
              inverted={!this.state.showDropDown}
              onClick={this.toggleDropDown}
            />
          }
          show={this.state.showDropDown}
        >
          <TextButton onClick={() => this.clickLang('en')}>EN</TextButton>
          <TextButton onClick={() => this.clickLang('de')}>DE</TextButton>
          <TextButton onClick={() => this.clickLang('es')}>ES</TextButton>
          <TextButton onClick={() => this.clickLang('ru')}>RU</TextButton>
        </DropDownList>
        {/* <DropDownMainArea>
          <TextButton
            onClick={this.toggleDropDown}
            inverted={!this.state.showDropDown}
          >{langButtonText[this.props.lang]}</TextButton>
          <DropDownOptionsArea show={this.state.showDropDown}>
            <DropDownLink onClick={() => this.clickLang('en')}>EN</DropDownLink>
            <DropDownLink onClick={() => this.clickLang('de')}>DE</DropDownLink>
            <DropDownLink onClick={() => this.clickLang('es')}>ES</DropDownLink>
            <DropDownLink onClick={() => this.clickLang('ru')}>RU</DropDownLink>
          </DropDownOptionsArea>
        </DropDownMainArea> */}
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