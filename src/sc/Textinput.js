import React, {Component} from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import {
  TRANSPARENT,
  FONT_COLOR,
  ACCENT_COLOR
} from '../utils/constants';

const Inputlabel = styled.label`
  display: block;
  font-size: 16px;
`;

const Inputfield = styled.div`
  margin: ${props => props.margin || '0'};
  width: ${props => props.width || '100%'};
  display: ${props => props.display};
`;

const StyledTextArea = styled.textarea`
	width: 100%;
	background-color: ${TRANSPARENT};
	border: 1px solid ${ACCENT_COLOR};
	color: ${FONT_COLOR};
	box-sizing: border-box;
	display: block;
	height: ${props => props.height ? props.height + 'px' : '25px'};
	resize: none;
	overflow: hidden;
  transition: height 0.2s ease;
`;

const StyledGhost = styled.div`
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;  
  visibility: hidden;
  position: absolute;
  top: 0;
  width: ${props => props.width ? props.width + 'px' : 'auto'};
  
`;

class DynamicTextarea extends Component {
  constructor(props) {
		super(props);
    this.state = {inputHeight: 0, ghostWidth: 0};
    this.input = null;
    this.ghost = null;
    this.adjustInputHeight = this.adjustInputHeight.bind(this);
    this.adjustGhostWidth = this.adjustGhostWidth.bind(this);
	}
	
	componentDidMount() {
    this.adjustGhostWidth();
    this.adjustInputHeight();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.inputHeight === nextState.inputHeight && this.props.value === nextProps.value) {
      return false;
    } else {
      return true;
    }
  }
  
  componentDidUpdate() {
    this.adjustInputHeight();
  }

  adjustGhostWidth() {
    this.setState({ghostWidth: this.input.clientWidth});
  }

  adjustInputHeight() {
		this.setState({inputHeight: this.ghost.clientHeight});
	}

  render() {
		let {id, rows, value, onChange} = this.props;
		let {inputHeight, ghostWidth} = this.state;
    return [
      <StyledTextArea
        key={1}
        id={id}
        innerRef={ref => this.input = ref}
        rows={rows}
        value={value}
        height={inputHeight}
        onChange={onChange}
        autoFocus={true}
      />,
      <StyledGhost
        key={2}
        innerRef={ref => this.ghost = ref}
        aria-hidden="true"
        width={ghostWidth}
      >{value}</StyledGhost>
    ];
  }
}

const Textinput = (props) => {
  let {type, value, onChange, ...rest} = props;
  let uid = _.uniqueId('input_');
  return (
    <Inputfield {...rest}>
      {props.children
        ? <Inputlabel htmlFor={uid}>{props.children}</Inputlabel>
        : null
      }
      <DynamicTextarea rows={1} id={uid} value={value} onChange={onChange} />
    </Inputfield>
  );
}

export default Textinput;