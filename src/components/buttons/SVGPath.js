import styled from 'styled-components';

import {ACCENT_COLOR, BACKGROUND_COLOR} from '../../utils/constants';

const SVGPath = styled.path.attrs({vectorEffect: 'non-scaling-stroke'})`
	stroke: ${props => props.inverted ? BACKGROUND_COLOR : ACCENT_COLOR};
	stroke-width: ${props => 2 * (1 + !!props.large) * (1 + !!props.clipPath)}px;
	fill: ${props => props.filled ? ACCENT_COLOR : 'none'};
	transform: rotate(${props => props.rotate || 0}deg);
	transform-origin: center;
	transition: 0.2s ease-in-out;
`;

export default SVGPath;