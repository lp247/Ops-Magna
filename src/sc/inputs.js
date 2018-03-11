import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

import {
  TRANSPARENT,
  FONT_COLOR,
  ACCENT_COLOR
} from '../utils/constants';

const basicstyle = css`
  width: 100%;
  background-color: ${TRANSPARENT};
  border: 1px solid ${ACCENT_COLOR};
  color: ${FONT_COLOR};
  box-sizing: border-box;
  display: block;
`;

const RawInput = styled.input`
  ${basicstyle}
`;

const Textarea = styled.textarea`
  ${basicstyle}
  height: ${props => props.height ? props.height : ''};
  resize: none;
  overflow-y: hidden;
`;

const Inputlabel = styled.label`
  display: block;
  font-size: 16px;
`;

const Inputfield = styled.div`
  margin: ${props => props.margin || '0'};
  width: ${props => props.width || '100%'};
  display: ${props => props.display};
`;

export const Input = (props) => {
  this.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    children: PropTypes.node.isRequired
  }
  let {type, value, onChange, ...rest} = props;
  return (
    <Inputfield {...rest}>
      {props.children 
        ? <Inputlabel htmlFor="id">{props.children}</Inputlabel>
        : null
      }
      {type === 'textarea'
        ? <Textarea rows='1' id="id" value={value} onChange={onChange} />
        : <RawInput type={type} id="id" value={value} onChange={onChange} />
      }
    </Inputfield>
  );
}