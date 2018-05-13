import React from 'react';
import _ from 'lodash';

import SVGPath from './SVGPath';
import svgWrapper from './svgWrapper';

const RhombusIcon = ({large, filled}) => {
  let cpid = _.uniqueId('rhombusclip_');
  console.log(filled);
  return (
    <g>
      <defs key={1}>
        <clipPath id={cpid}>
          <path d='M50 0 L100 50 L50 100 L0 50 Z' />
        </clipPath>
      </defs>
      <SVGPath
        key={2}
        d='M50 0 L100 50 L50 100 L0 50 Z'
        large={large}
        filled={filled}
        clipPath={'url(#' + cpid + ')'}
      />
    </g>
  );
}

const RhombusButton = svgWrapper(RhombusIcon);

export default RhombusButton;