import React from 'react';
import _ from 'lodash';

import SVGCircle from './SVGCircle';
import svgWrapper from './svgWrapper';
import uuidv4 from '../../utils/uuidv4';

const MoonIcon = ({large}) => {
	let cpid = uuidv4();
  return (
    <g>
			<defs>
				<clipPath id={cpid}>
					<circle cx='50%' cy='50%' r='50%' />
				</clipPath>
			</defs>
			<SVGCircle
				cx='50%'
        cy='50%'
        r='10%'
        large={large}
        filled={true}
			/>
			<SVGCircle
				cx='50%'
				cy='50%'
				r='50%'
				large={false}
				filled={false}
				clipPath={'url(#' + cpid + ')'}
			/>
		</g>
  );
}

const MoonButton = svgWrapper(MoonIcon);

export default MoonButton;