import styled from 'styled-components';

import {ACCENT_COLOR, TRANSPARENT, FONT_COLOR} from '../../utils/constants';
import inputWrapper from "./inputWrapper";

const RawNumberInput = styled.input.attrs({
	type: 'number'
})`
	width: ${props => props.width || '100%'};
	background-color: ${TRANSPARENT};
	border: 1px solid ${ACCENT_COLOR};
	color: ${FONT_COLOR};
	box-sizing: border-box;
	display: block;
	text-align: center;
`;

const NumberInput = inputWrapper(RawNumberInput);

export default NumberInput;