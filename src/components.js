import React from 'react';
import styled from 'styled-components';

export const fontcolor = 'rgb(184, 184, 184)';
export const bgcolor = 'rgb(33, 34, 37)';
export const accentcolor = 'rgb(111, 178, 156)';

//=============================================================================
//       Content Container
//=============================================================================

export const Page = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: ${bgcolor};
  color: ${fontcolor};
`;

export const ContentWrapper = styled.div`
  @media (min-width: 501px) {
    width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 500px) {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
  box-sizing: border-box;
  padding: 12px;
`;

export const Section = styled.div`
  margin-top: 48px;
`;

export const PaleSection = Section.extend`
  opacity: 0.3;
`;

//=============================================================================
//       Tables
//=============================================================================

export const Table = styled.table`
  border-spacing: 12px 4px;
`;

export const TRow = styled.tr`
`;

export const TCell = styled.td`
  width: ${props => props.primary ? '99%' : 'auto'};
  white-space: ${props => props.primary ? 'normal' : 'nowrap'};
  vertical-align: middle;
`;

//=============================================================================
//       Inputs
//=============================================================================

const StyledCheckbox = styled.input`
  float: left;
`;

export const Checkbox = (props) => {
  return (
    <StyledCheckbox type='checkbox' {...props} />
  );
}

//=============================================================================
//       
//=============================================================================

export const Header = styled.p`
  font-size: 36px;
  margin-bottom: 16px;
`;

export const Infotext = styled.p`
`;

export const Successtext = Infotext.extend`
  color: forestgreen;
`;

export const Inputfield = styled.div`
  margin-top: 16px;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  background-color: ${fontcolor};
  border: none;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 128px;
  background-color: ${fontcolor};
`;

export const Inputlabel = styled.label`
  display: block;
  font-size: 16px;
`;

//=============================================================================
//       SVG Buttons
//=============================================================================

const SVG = styled.svg`
  display: inline-block;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  cursor: pointer;
  float: ${props => props.float || 'none'}
`;

const SVGPath = styled.path`
  stroke: ${props => props.inverted ? accentcolor : 'black'};
  stroke-width: 10;
`;

const SVGRect = styled.rect`
  fill: ${props => props.inverted ? 'rgba(0, 0, 0, 0)' : accentcolor};
`;

const SVGCircle = styled.circle`
  stroke: ${props => props.inverted ? accentcolor : 'black'};
  stroke-width: 10;
  fill: none;
`;

export const PlusButton = props => {
  return (
    <SVG
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <SVGRect x="0" y="0" width="100" height="100"/>
      <SVGPath d="M50 20 L50 80 M20 50 L80 50"></SVGPath>
    </SVG>
  );
}

export const XButton = props => {
  let {inverted, ...rest} = props;
  return (
    <SVG
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <SVGRect x="0" y="0" width="100" height="100" inverted={inverted}/>
      <SVGPath d="M20 20 L80 80 M20 80 L80 20" inverted={inverted}></SVGPath>
    </SVG>
  );
}

export const OButton = props => {
  let {inverted, ...rest} = props;
  return (
    <SVG
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <SVGRect x="0" y="0" width="100" height="100" inverted={inverted}/>
      <SVGCircle cx='50' cy='50' r='30' inverted={inverted} />
    </SVG>
  );
}

//=============================================================================
//       Text Buttons
//=============================================================================

export const TextButton = styled.p`
  display: inline-block;
  background-color: ${accentcolor};
  cursor: pointer;
  color: black;
  padding: 8px;
  margin-left: 16px;
  &:first-child {
    margin-left: 0;
  }
`;

//=============================================================================
//       Links
//=============================================================================

export const Link = styled.a`
  color: ${accentcolor};
  cursor: pointer;
`;