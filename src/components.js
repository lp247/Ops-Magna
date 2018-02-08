import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

export const fontcolor = 'rgb(184, 184, 184)';
export const bgcolor = 'rgb(33, 34, 37)';
export const accentcolor = 'rgb(111, 178, 156)';
export const transparent = 'rgba(0, 0, 0, 0)';

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
  padding: 48px 12px;
`;

export const Section = styled.div`
  margin-bottom: 64px;
  opacity: ${props => props.opaque ? 0.3 : 1};
`;

export const Subsection = styled.div`
  margin-bottom: 12px;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: ${props => props.jc};
  align-items: center;
  flex-flow: ${props => props.wrap ? 'row wrap' : 'row nowrap'};
  margin-bottom: 8px;
`;

//=============================================================================
//       Tables
//=============================================================================

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const TRow = styled.tr`
`;

export const TCell = styled.td`
  width: ${props => props.primary ? '99%' : 'auto'};
  white-space: ${props => props.primary ? 'normal' : 'nowrap'};
  padding: ${props => props.padding || '2px 10px'};
  vertical-align: middle;
  opacity: ${props => props.opaque ? 0.3 : 1};
  /* border: 1px solid black; */
`;

//=============================================================================
//       Inputs
//=============================================================================

const basicstyle = css`
  width: 100%;
  background-color: ${transparent};
  border: 1px solid ${accentcolor};
  color: white;
`;

const RawInput = styled.input`
  ${basicstyle}
  height: 32px;
  color: ${fontcolor};
`;

const Textarea = styled.textarea`
  ${basicstyle}
  height: ${props => props.height || '128px'};
  resize: none;
  color: ${fontcolor};
`;

const Inputlabel = styled.label`
  display: block;
  font-size: 16px;
`;

const Inputfield = styled.div`
  margin-top: 16px;
  width: ${props => props.width || '100%'};
  display: ${props => props.display};
`;

export const Input = (props) => {
  this.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    children: PropTypes.node.isRequired
  }
  let {type, value, onChange, taheight, ...rest} = props;
  return (
    <Inputfield {...rest}>
      <Inputlabel htmlFor="id">{props.children}</Inputlabel>
      {type === 'textarea'
        ? <Textarea height={taheight} id="id" value={value} onChange={onChange} />
        : <RawInput type={type} id="id" value={value} onChange={onChange} />
      }
    </Inputfield>
  );
}

//=============================================================================
//       
//=============================================================================

export const Header = styled.p`
  font-size: 36px;
  margin-bottom: 36px;
`;

export const Infotext = styled.p`
`;

//=============================================================================
//       SVG Buttons
//=============================================================================

const SVG = styled.svg`
  display: ${props => props.display || 'inline'};
  width: ${props => props.size || '10px'};
  height: ${props => props.size || '10px'};
  cursor: pointer;
  float: ${props => props.float || 'none'};
  margin: ${props => props.margin ? props.margin : 0};
`;

const SVGPath = styled.path`
  stroke: ${props => props.color || transparent};
  stroke-width: ${props => props.weight === 'thin' ? '1' : (props.weight === 'thick' ? '4' : '2')}px;
  fill: none;
`;

const SVGRect = styled.rect`
  stroke: ${props => props.color || transparent};
  stroke-width: ${props => props.weight === 'thin' ? '2' : props.weight === 'thick' ? '8' : '4'}px;
  fill: ${props => props.filled ? props.color || transparent : 'none'};
`;

const SVGCircle = styled.circle`
  stroke: ${props => props.color || transparent};
  stroke-width: ${props => props.weight === 'thin' ? '2' : props.weight === 'thick' ? '8' : '4'}px;
  fill: ${props => props.filled ? props.color || transparent : 'none'};
`;

export const PlusButton = props => {
  let {weight, ...rest} = props;
  return (
    <SVG
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <SVGRect x="0" y="0" width="100" height="100" vectorEffect='non-scaling-stroke' />
      <SVGPath d="M50 0 L50 100 M0 50 L100 50" vectorEffect='non-scaling-stroke' color={accentcolor} weight={weight} />
    </SVG>
  );
}

export const XButton = props => {
  let {weight, ...rest} = props;
  return (
    <SVG
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <SVGRect x="0" y="0" width="100" height="100" vectorEffect='non-scaling-stroke' />
      <SVGPath d="M0 0 L100 100 M0 100 L100 0" vectorEffect='non-scaling-stroke' color={accentcolor} weight={weight} />
    </SVG>
  );
}

export const OButton = props => {
  let {checked, weight, ...rest} = props;
  return (
    <SVG
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <defs>
        <clipPath id='clip'>
          <circle cx='50%' cy='50%' r='50%' />
        </clipPath>
      </defs>
      <SVGRect
        x="0"
        y="0"
        width="100"
        height="100"
        vectorEffect='non-scaling-stroke'
      />
      <SVGCircle
        id='cicle'
        cx='50%'
        cy='50%'
        r='50%'
        vectorEffect='non-scaling-stroke'
        color={accentcolor}
        weight={weight}
        filled={checked}
        clipPath='url(#clip)'
      />
    </SVG>
  );
}

export const CBButton = props => {
  let {checked, weight, ...rest} = props;
  return (
    <SVG
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {checked
        ? <SVGPath d="M50 0 L50 100" vectorEffect='non-scaling-stroke' color={accentcolor} weight={weight} />
        : <SVGPath d="M0 50 L100 50" vectorEffect='non-scaling-stroke' color={accentcolor} weight={weight} />
      }
    </SVG>
  );
}

//=============================================================================
//       Text Buttons
//=============================================================================

const RawButton = styled.p`
  cursor: ${props => props.invisible ? '' : 'pointer'};
  padding: ${props => !props.width ? (props.small ? '4px' : '8px') : '0px'};
  width: ${props => props.width || 'auto'};
  height: ${props => props.square ? props.width : 'auto'};
  text-align: center;
  font-size: ${props => props.small ? '16px' : 'inherit'};
  line-height: ${props => props.square ? props.width : 'normal'};
`;

export const TextButton = RawButton.extend`
  background-color: ${props => props.invisible ? transparent : accentcolor};
  color: ${props => props.invisible ? transparent : 'black'};
`;

export const Selector = RawButton.extend`
  border: 2px solid ${props => props.selected && !props.invisible ? accentcolor : transparent};
  color: ${props => props.invisible ? transparent : accentcolor};
`;

//=============================================================================
//       Links
//=============================================================================

export const Link = styled.a`
  color: ${accentcolor};
  cursor: pointer;
`;