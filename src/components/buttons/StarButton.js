import React from 'react';

import SVGPath from './SVGPath';
import svgWrapper from './svgWrapper';

const StarIcon = ({large}) => {
  return (
    <g>
      <SVGPath
        d="M14.6447 14.6447 L85.3553 85.3553 M14.6447 85.3553 L85.3553 14.6447 M50 0 L50 100 M0 50 L100 50"
        large={large}
      />
    </g>
  );
}

const StarButton = svgWrapper(StarIcon);

export default StarButton;