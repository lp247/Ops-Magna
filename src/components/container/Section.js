import styled from 'styled-components';

const Section = styled.div`
  margin: ${props => props.margin || '0 0 64px'};
  padding: 0;
  opacity: ${props => props.opacity || 1};
`;

export default Section;