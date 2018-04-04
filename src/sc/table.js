import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const TCell = styled.td`
  width: ${props => props.primary ? '99%' : 'auto'};
  white-space: ${props => props.primary ? 'normal' : 'nowrap'};
  padding: ${props => props.padding || '2px 10px'};
  vertical-align: middle;
  opacity: ${props => props.opacity === undefined ? 1 : props.opacity};
  text-decoration: ${props => props.lineThrough ? 'line-through' : 'none'};
  /* border: 1px solid white; */
`;