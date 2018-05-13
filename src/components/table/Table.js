import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Table = ({children, ...rest}) => {
	return (
		<StyledTable>
			<tbody>
				{children}
			</tbody>
		</StyledTable>
	);
}

export default Table;