import React from 'react';
import styled from 'styled-components';
import {FONT_COLOR} from '../../utils/constants';
import uuidv4 from '../../utils/uuidv4';

const Inputlabel = styled.label`
  display: block;
  color: ${FONT_COLOR};
`;

const Inputfield = styled.div`
  margin: ${props => props.margin || '0'};
  width: ${props => props.width || '100%'};
  display: ${props => props.display};
`;

const inputWrapper = (InputComponent) => {
  return function({type, value, onChange, children, bottomBorderOnly, ...rest}) {
    let uid = uuidv4();
    return (
      <Inputfield {...rest}>
        {children
          ? <Inputlabel htmlFor={uid}>{children}</Inputlabel>
          : null
        }
        <InputComponent
          id={uid}
          value={value}
          onChange={onChange}
          bottomBorderOnly={bottomBorderOnly}
        />
      </Inputfield>
    );
  }
}

export default inputWrapper;