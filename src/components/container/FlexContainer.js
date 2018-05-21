import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  justify-content: ${props => props.jc};
  align-items: center;
  flex-flow: ${props => props.wrp ? 'row wrap' : 'row nowrap'};
  margin: ${props => props.margin || '0 0 0 0'};
`;

export default FlexContainer;