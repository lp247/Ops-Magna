import React from 'react';

import SVGPath from './SVGPath';
import svgWrapper from './svgWrapper';

const XIcon = ({large}) => {
  return (
    <g>
      <SVGPath
        d="M0 0 L100 100 M0 100 L100 0"
        large={large}
      />
    </g>
  );
}

const XButton = svgWrapper(XIcon);

export default XButton;