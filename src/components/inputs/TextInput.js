import React, {Component} from 'react';
import styled from 'styled-components';

import inputWrapper from './inputWrapper';

import {
  TRANSPARENT,
  FONT_COLOR,
  ACCENT_COLOR
} from '../../utils/constants';

const StyledTextArea = styled.textarea.attrs({
  value: props => props.value,
  onChange: props => props.onChange
})`
	width: 100%;
	background-color: ${TRANSPARENT};
	border: 1px solid ${ACCENT_COLOR};
  border-top-color: ${props => props.bottomBorderOnly ? TRANSPARENT : ACCENT_COLOR};
  border-left-color: ${props => props.bottomBorderOnly ? TRANSPARENT : ACCENT_COLOR};
  border-right-color: ${props => props.bottomBorderOnly ? TRANSPARENT : ACCENT_COLOR};
  border-bottom-color: ${ACCENT_COLOR};
	color: ${FONT_COLOR};
	box-sizing: border-box;
	display: block;
	resize: none;
	overflow: hidden;
  padding: ${props => props.padding || '0'};
`;

const StyledGhost = styled.div`
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;  
  visibility: hidden;
  border: 1px solid white;
  position: absolute;
  top: 0;
  width: ${props => props.width ? props.width + 'px' : 'auto'};
`;

class DynamicTextarea extends Component {
  constructor(props) {
		super(props);
    this.state = {inputRows: 1, ghostWidth: 0, ghostLineHeight: 0};
    this.input = null;
    this.ghost = null;
    this.adjustInputRows = this.adjustInputRows.bind(this);
    this.adjustGhostWidth = this.adjustGhostWidth.bind(this);
    this.calcLineHeight = this.calcLineHeight.bind(this);
  }
  
  componentWillMount() {
    window.addEventListener('resize', this.adjustGhostWidth);
    window.addEventListener('orientationchange', this.adjustGhostWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.adjustGhostWidth);
    window.removeEventListener('orientationchange', this.adjustGhostWidth);
  }
	
	componentDidMount() {
    this.adjustGhostWidth();
    this.calcLineHeight();
    this.adjustInputRows();
  }
  
  componentDidUpdate() {
    this.adjustInputRows();
  }

  adjustGhostWidth() {
    if (this.state.ghostWidth !== this.input.clientWidth) {
      this.setState({ghostWidth: this.input.clientWidth});
    }
  }
  
  adjustInputRows() {
    let ghostRows = Math.max(Math.floor(this.ghost.clientHeight / this.state.ghostLineHeight), 1);
    if (ghostRows !== this.state.inputRows) this.setState({inputRows: ghostRows});
  }

  calcLineHeight() {
    this.setState({ghostLineHeight: this.ghost.clientHeight});
  }

  render() {
    let {value, ...rest} = this.props;
		let {inputRows, ghostWidth} = this.state;
    return [
      <StyledTextArea
        key={1}
        innerRef={ref => this.input = ref}
        rows={inputRows}
        autoFocus={false}
        value={value}
        {...rest}
      />,
      <StyledGhost
        key={2}
        innerRef={ref => this.ghost = ref}
        aria-hidden="true"
        width={ghostWidth}
      >{value || 'A'}</StyledGhost>
    ];
  }
}

const TextInput = inputWrapper(DynamicTextarea);

export default TextInput;