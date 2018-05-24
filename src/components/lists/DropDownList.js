import React from 'react';
import styled from 'styled-components';

const DropDownMainArea = styled.div`
  position: relative;
`;

const DropDownOptionsArea = styled.div`
	width: 300px;
	width: ${props => props.show ? '280px' : '0'};
	overflow: hidden;
	display: block;
  position: absolute;
	box-sizing: border-box;
	left: ${props => props.leftAligned ? '100%' : '0'};
	transform: ${props => props.leftAligned ? 'translate(-100%, 0)' : 'none'};
	transition: 0.2s ease-in-out;
	z-index: 1;
`;

// const DropDownLink = styled.a`
//   color: black;
//   padding: 12px 16px;
//   text-decoration: none;
//   display: block;
//   cursor: pointer;
//   user-select: none;
//   background-color: ${ACCENT_COLOR};
//   &:hover {
//     background-color: ${ACCENT_COLOR_DARKER};
//   }
// `;

const DropDownList = ({ButtonComponent, children, leftAligned, show}) => (
	<DropDownMainArea>
		{ButtonComponent}
		<DropDownOptionsArea show={show} leftAligned={leftAligned}>
			{children}
		</DropDownOptionsArea>
	</DropDownMainArea>
);

export default DropDownList;