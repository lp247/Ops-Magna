import styled from 'styled-components';

import {ACCENT_COLOR, BACKGROUND_COLOR} from '../../utils/constants';

const getPadding = (width, size) => {
  if (width) return '0px';
  switch (size) {
    case 'small': return '4px';
    case 'big': return '16px';
    default: return '8px';
  }
}

const getFontSize = (size) => {
  switch (size) {
    case 'small': return '0.9rem';
    case 'big': return '1.5rem';
    default: return 'inherit';
  }
}

const TextButton = styled.a`
  display: block;
  cursor: pointer;
  padding: ${props => getPadding(props.width, props.size)};
  margin: ${props => props.margin || '0'};
  width: ${props => props.width || 'fit-content'};
  text-align: center;
  font-size: ${props => getFontSize(props.size)};
  background-color: ${props => props.inverted ? BACKGROUND_COLOR : ACCENT_COLOR};
  color: ${props => props.inverted ? ACCENT_COLOR : 'black'};
`;

export default TextButton;