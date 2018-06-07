import React from 'react';
import _ from 'lodash';

import SVGPath from './SVGPath';
import svgWrapper from './svgWrapper';
import uuidv4 from '../../utils/uuidv4';

const RhombusIcon = ({large, filled}) => {
  let cpid = uuidv4();
  return (
    <g>
      <defs>
        <clipPath id={cpid}>
          <path d='M50 0 L100 50 L50 100 L0 50 Z' />
        </clipPath>
      </defs>
      <SVGPath
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