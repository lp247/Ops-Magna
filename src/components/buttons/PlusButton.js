import React from 'react';

import SVGPath from './SVGPath';
import svgWrapper from './svgWrapper';

const PlusIcon = ({large}) => {
  return (
    <g>
      <SVGPath
        d="M50 0 L50 100 M0 50 L100 50"
        large={large}
      />
    </g>
  );
}

const PlusButton = svgWrapper(PlusIcon);

export default PlusButton;