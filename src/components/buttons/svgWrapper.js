import React from 'react';

import SVG from './SVG';

const svgWrapper = (IconComponent) => {
  return function({large, filled, vertical, ...rest}) {
    return (
      <SVG
        viewBox='0 0 100 100'
        xmlns='http://www.w3.org/2000/svg'
        large={large}
        {...rest}
      >
        <IconComponent
          large={large}
          filled={filled}
          vertical={vertical}
        />
      </SVG>
    );
  }
}

export default svgWrapper;