import React from 'react';

import SVGPath from './SVGPath';
import svgWrapper from './svgWrapper';

const CBIcon = ({large, vertical}) => {
  return (
    <g>
      {vertical
        ? <SVGPath
          d="M50 0 L50 100"
          large={large}
        />
        : <SVGPath
          d="M0 50 L100 50"
          large={large}
        />
      }
    </g>
  );
}

const CBButton = svgWrapper(CBIcon);

export default CBButton;