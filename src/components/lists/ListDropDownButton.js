import React from 'react';
import TriangleButton from '../buttons/TriangleButton';

const ListDropDownButton = ({up, onClick}) => (
	<TriangleButton
		large
		up={up}
		padding='4px'
		onClick={onClick}
	/>
);

export default ListDropDownButton;