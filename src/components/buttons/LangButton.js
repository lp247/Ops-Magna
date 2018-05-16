import styled from 'styled-components';
import {FONT_COLOR} from '../../utils/constants';

const LangButton = styled.a`
  cursor: pointer;
  padding: ${props => !props.width ? (props.small ? '4px' : '8px') : '0px'};
  margin: ${props => props.margin ? props.margin : '0'};
  width: ${props => props.width || 'auto'};
  text-align: center;
  font-size: ${props => props.small ? '1.2rem' : 'inherit'};
	color: ${FONT_COLOR};
	float: right;
`;

export default LangButton;