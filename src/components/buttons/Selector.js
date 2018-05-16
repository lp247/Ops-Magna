import styled from 'styled-components';

import {ACCENT_COLOR, TRANSPARENT} from '../../utils/constants';

const Selector = styled.p`
  cursor: ${props => props.invisible ? 'auto' : 'pointer'};
  padding: ${props => !props.width ? (props.small ? '4px' : '8px') : '0px'};
  margin: ${props => props.margin ? props.margin : '0'};
  width: ${props => props.width || 'auto'};
  height: ${props => props.square ? props.width : 'auto'};
  text-align: center;
  font-size: ${props => props.small ? '1.2rem' : 'inherit'};
  line-height: ${props => props.square ? props.width : 'normal'};
  border: 2px solid ${props => props.selected && !props.invisible ? ACCENT_COLOR : TRANSPARENT};
  color: ${props => props.invisible ? TRANSPARENT : ACCENT_COLOR};
`;

export default Selector;