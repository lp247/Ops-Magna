import styled from 'styled-components';
import {FONT_COLOR} from '../../utils/constants';

const BasicSpan = styled.span`
  user-select: none;
  color: ${FONT_COLOR};
  opacity: ${props => props.opacity || '1'};
  align-self: center;
  justify-self: left;
  padding: ${props => props.listtext ? '1px' : '0'};
  text-decoration: ${props => props.lineThrough ? 'line-through' : 'unset'};
`;

export default BasicSpan;