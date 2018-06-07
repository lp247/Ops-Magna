import styled from 'styled-components';

/**
 * Div container with display flex.
 * @param {Object} props - Properties
 * @param {string} props.jc - Content justification.
 * @param {boolean} props.wrp - Whether to wrap the content.
 * @param {string} props.margin - Margin of container.
 */
const FlexContainer = styled.div`
  display: flex;
  justify-content: ${props => props.jc};
  align-items: center;
  flex-flow: ${props => props.wrp ? 'row wrap' : 'row nowrap'};
  margin: ${props => props.margin || '0 0 0 0'};
`;

export default FlexContainer;