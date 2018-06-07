import React from 'react';

import SVGCircle from './SVGCircle';
import svgWrapper from './svgWrapper';
import uuidv4 from '../../utils/uuidv4';

const OIcon = ({large, filled}) => {
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
        r='50%'
        large={large}
        filled={filled}
        clipPath={'url(#' + cpid + ')'}
      />
    </g>
  );
}

const OButton = svgWrapper(OIcon);

export default OButton;