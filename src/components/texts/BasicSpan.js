import styled from 'styled-components';
import {FONT_COLOR} from '../../utils/constants';

const BasicSpan = styled.span`
  user-select: none;
  color: ${FONT_COLOR};
  font-size: ${props => props.fsize || 'unset'};
`;

export default BasicSpan;