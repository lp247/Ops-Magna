import styled from 'styled-components';

import {
  TRANSPARENT,
  ACCENT_COLOR
} from '../constants';

const RawButton = styled.p`
  cursor: ${props => props.invisible ? '' : 'pointer'};
  padding: ${props => !props.width ? (props.small ? '4px' : '8px') : '0px'};
  width: ${props => props.width || 'auto'};
  height: ${props => props.square ? props.width : 'auto'};
  text-align: center;
  font-size: ${props => props.small ? '16px' : 'inherit'};
  line-height: ${props => props.square ? props.width : 'normal'};
`;

export const TextButton = RawButton.extend`
  background-color: ${props => props.invisible ? TRANSPARENT : ACCENT_COLOR};
  color: ${props => props.invisible ? TRANSPARENT : 'black'};
`;

export const Selector = RawButton.extend`
  border: 2px solid ${props => props.selected && !props.invisible ? ACCENT_COLOR : TRANSPARENT};
  color: ${props => props.invisible ? TRANSPARENT : ACCENT_COLOR};
`;