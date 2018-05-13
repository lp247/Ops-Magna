import styled from 'styled-components';
import {FONT_COLOR} from '../../utils/constants';

const TCell = styled.td`
  width: ${props => props.primary ? '99%' : 'auto'};
  white-space: ${props => props.primary ? 'normal' : 'nowrap'};
  padding: ${props => props.padding || '2px 10px'};
  vertical-align: middle;
  opacity: ${props => props.opacity === undefined ? 1 : props.opacity};
  text-decoration: ${props => props.lineThrough ? 'line-through' : 'none'};
  user-select: none;
  color: ${FONT_COLOR};
  /* border: 1px solid white; */
`;

export default TCell;