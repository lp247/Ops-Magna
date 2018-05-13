import styled from 'styled-components';

const SVG = styled.svg`
  display: ${props => props.display || 'inline'};
  width: ${props => props.large ? 24 : 16}px;
  height: ${props => props.large ? 24 : 16}px;
  cursor: ${props => props.onClick ? 'pointer' : 'auto'};
  float: ${props => props.float || 'none'};
  margin: ${props => props.margin || 0};
`;

export default SVG;