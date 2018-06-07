import React from 'react';

import SVGPath from './SVGPath';
import svgWrapper from './svgWrapper';
import uuidv4 from '../../utils/uuidv4';

const PlusIcon = ({large, inverted, up}) => {
	let cpid = uuidv4();
  return (
    <g>
			<defs>
        <clipPath id={cpid}>
          <path d="M50 100 L0 13.4 L 100 13.4 z" />
        </clipPath>
      </defs>
			<SVGPath
				d="M50 100 L0 13.4 L 100 13.4 z"
				large={large}
				// inverted={inverted}
				rotate={180 * up}
				clipPath={'url(#' + cpid + ')'}
			/>
    </g>
  );
}

const PlusButton = svgWrapper(PlusIcon);

export default PlusButton;