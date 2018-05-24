import styled from 'styled-components';

import {ACCENT_COLOR, BACKGROUND_COLOR} from '../../utils/constants';

const ButtonContainer = styled.div`
  display: block;
  padding: ${props => props.padding || '0'};
  background-color: ${props => props.inverted ? ACCENT_COLOR : BACKGROUND_COLOR};
  cursor: ${props => props.onClick ? 'pointer' : 'auto'};
  float: ${props => props.float || 'none'};
  margin: ${props => props.margin || 0};
`;

export default ButtonContainer;