import React from 'react';

import SVGPath from './SVGPath';
import SVGCircle from './SVGCircle';
import svgWrapper from './svgWrapper';

const SunIcon = ({large}) => {
  return (
    <g>
      <SVGCircle
				cx='50%'
        cy='50%'
        r='10%'
        large={large}
        filled={true}
			/>
			<SVGPath
				d='M50 0 L50 20 M100 50 L80 50 M50 100 L50 80 M0 50 L20 50 M14.6447 14.6447 L28.7868 28.7868 M85.3553 14.6447 L71.2132 28.7868 M85.3553 85.3553 L71.2132 71.2132 M14.6447 85.3553 L28.7868 71.2132'
				large={false}
			/>
    </g>
  );
}

const SunButton = svgWrapper(SunIcon);

export default SunButton;