import styled from 'styled-components';

const SVG = styled.svg`
  display: ${props => props.display || 'block'};
  width: ${props => props.large ? 24 : 16}px;
  height: ${props => props.large ? 24 : 16}px;
`;

export default SVG;