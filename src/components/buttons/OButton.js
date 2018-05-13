import React from 'react';
import _ from 'lodash';

import SVGCircle from './SVGCircle';
import svgWrapper from './svgWrapper';

const OIcon = ({large, filled}) => {
  let cpid = _.uniqueId('oclip_');
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