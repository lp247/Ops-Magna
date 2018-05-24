import React from 'react';

import SVG from './SVG';
import ButtonContainer from './ButtonContainer';

const svgWrapper = (IconComponent) => {
  return function({large, filled, vertical, inverted, up, ...rest}) {
    return (
      <ButtonContainer
        inverted={inverted}
        {...rest}>
        <SVG
          viewBox='0 0 100 100'
          xmlns='http://www.w3.org/2000/svg'
          large={large}
        >
          <IconComponent
            large={large}
            filled={filled}
            vertical={vertical}
            inverted={inverted}
            up={up}
          />
        </SVG>
      </ButtonContainer>
    );
  }
}

export default svgWrapper;