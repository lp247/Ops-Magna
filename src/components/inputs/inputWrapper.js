import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import {FONT_COLOR} from '../../utils/constants';

const Inputlabel = styled.label`
  display: block;
  font-size: 16px;
  color: ${FONT_COLOR};
`;

const Inputfield = styled.div`
  margin: ${props => props.margin || '0'};
  width: ${props => props.width || '100%'};
  display: ${props => props.display};
`;

const inputWrapper = (InputComponent) => {
  return function({type, value, onChange, children, bottomBorderOnly, ...rest}) {
    let uid = _.uniqueId('input_');
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