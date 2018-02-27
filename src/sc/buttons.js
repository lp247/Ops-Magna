import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const SVG = styled.svg`
  display: ${props => props.display || 'inline'};
  width: ${props => props.size || '10px'};
  height: ${props => props.size || '10px'};
  cursor: ${props => props.onClick ? 'pointer' : 'auto'};
  float: ${props => props.float || 'none'};
  margin: ${props => props.margin ? props.margin : 0};
`;

const SVGPath = styled.path`
  stroke: ${props => props.color};
  stroke-width: ${props => {
    let sw;
    props.weight === 'thin' ? sw = 1 : (props.weight === 'thick' ? sw = 4 : sw = 2);
    if (props.clipped) sw = sw * 2;
    return sw;
  }}px;
  fill: ${props => props.filled ? props.color : 'none'};
`;

const SVGRect = styled.rect`
  stroke: ${props => props.color};
  stroke-width: ${props => props.weight === 'thin' ? '2' : props.weight === 'thick' ? '8' : '4'}px;
  fill: ${props => props.filled ? props.color : 'none'};
`;

const SVGCircle = styled.circle`
  stroke: ${props => props.color};
  stroke-width: ${props => props.weight === 'thin' ? '2' : props.weight === 'thick' ? '8' : '4'}px;
  fill: ${props => props.filled ? props.color : 'none'};
`;

export const PlusButton = props => {
  let {weight, color, ...rest} = props;
  return (
    <SVG
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <SVGRect
        x="0"
        y="0"
        width="100"
        height="100"
        vectorEffect='non-scaling-stroke'
      />
      <SVGPath
        d="M50 0 L50 100 M0 50 L100 50"
        vectorEffect='non-scaling-stroke'
        color={color}
        weight={weight}
      />
    </SVG>
  );
}

export const XButton = props => {
  let {weight, color, ...rest} = props;
  return (
    <SVG
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <SVGRect
        x="0"
        y="0"
        width="100"
        height="100"
        vectorEffect='non-scaling-stroke'
      />
      <SVGPath
        d="M0 0 L100 100 M0 100 L100 0"
        vectorEffect='non-scaling-stroke'
        color={color}
        weight={weight}
      />
    </SVG>
  );
}

export const StarButton = props => {
  let {weight, color, ...rest} = props;
  return (
    <SVG
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <SVGRect
        x="0"
        y="0"
        width="100"
        height="100"
        vectorEffect='non-scaling-stroke'
      />
      <SVGPath
        d="M15 15 L85 85 M15 85 L85 15 M50 0 L50 100 M0 50 L100 50"
        vectorEffect='non-scaling-stroke'
        color={color}
        weight={weight}
      />
    </SVG>
  );
}

export const OButton = props => {
  let id = _.uniqueId('circleclip_');
  let {checked, weight, color, ...rest} = props;
  return (
    <SVG
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <defs>
        <clipPath id={id}>
          <circle cx='50%' cy='50%' r='50%' />
        </clipPath>
      </defs>
      {/* <SVGRect
        x="0"
        y="0"
        width="100"
        height="100"
        vectorEffect='non-scaling-stroke'
      /> */}
      <SVGCircle
        id='cicle'
        cx='50%'
        cy='50%'
        r='50%'
        vectorEffect='non-scaling-stroke'
        color={color}
        weight={weight}
        filled={checked}
        clipPath={'url(#' + id + ')'}
      />
    </SVG>
  );
}

export const RhombusButton = props => {
  let {checked, weight, color, ...rest} = props;
  return (
    <SVG
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <defs>
        <clipPath id='rhombusclip'>
          <path d='M50 0 L100 50 L50 100 L0 50 Z' />
        </clipPath>
      </defs>
      <SVGPath
        d='M50 0 L100 50 L50 100 L0 50 Z'
        vectorEffect='non-scaling-stroke'
        color={color}
        weight={weight}
        filled={checked}
        clipPath='url(#rhombusclip)'
        clipped={true}
      />
    </SVG>
  );
}

export const CBButton = props => {
  let {vertical, weight, color, ...rest} = props;
  return (
    <SVG
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {vertical
        ? <SVGPath
          d="M50 0 L50 100"
          vectorEffect='non-scaling-stroke'
          color={color}
          weight={weight}
        />
        : <SVGPath
          d="M0 50 L100 50"
          vectorEffect='non-scaling-stroke'
          color={color}
          weight={weight}
        />
      }
    </SVG>
  );
}