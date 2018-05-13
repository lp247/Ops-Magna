import styled from 'styled-components';

import {ACCENT_COLOR, TRANSPARENT, FONT_COLOR} from '../../utils/constants';
import inputWrapper from "./inputWrapper";

const RawDateInput = styled.input.attrs({
	type: 'date'
})`
	width: ${props => props.width || '100%'};
	background-color: ${TRANSPARENT};
	border: 1px solid ${ACCENT_COLOR};
	color: ${FONT_COLOR};
	box-sizing: border-box;
	display: block;
	text-align: center;
`;

const DateInput = inputWrapper(RawDateInput);

export default DateInput;