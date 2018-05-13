import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  justify-content: ${props => props.jc};
  align-items: center;
  flex-flow: ${props => props.wrp ? 'row wrap' : 'row nowrap'};
  margin-bottom: 8px;
`;

export default FlexContainer;