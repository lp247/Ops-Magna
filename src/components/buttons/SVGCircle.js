import styled from 'styled-components';

import {ACCENT_COLOR} from '../../utils/constants';

const SVGCircle = styled.circle.attrs({vectorEffect: 'non-scaling-stroke'})`
	stroke: ${ACCENT_COLOR};
	stroke-width: ${props => 2 * (1 + !!props.large) * (1 + !!props.clipPath)}px;
	fill: ${props => props.filled ? ACCENT_COLOR : 'none'};
`;

export default SVGCircle;