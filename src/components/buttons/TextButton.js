import styled from 'styled-components';

import {ACCENT_COLOR, BACKGROUND_COLOR} from '../../utils/constants';

const TextButton = styled.a`
  display: block;
  cursor: pointer;
  padding: ${props => !props.width ? (props.small ? '4px' : '8px') : '0px'};
  margin: ${props => props.margin ? props.margin : '0'};
  width: ${props => props.width || 'auto'};
  text-align: center;
  font-size: ${props => props.small ? '1.2rem' : 'inherit'};
  background-color: ${props => props.inverted ? BACKGROUND_COLOR : ACCENT_COLOR};
  color: ${props => props.inverted ? ACCENT_COLOR : 'black'};
`;

export default TextButton;