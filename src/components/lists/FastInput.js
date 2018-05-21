import React from 'react';
import PlusButton from '../buttons/PlusButton';
import TextInput from '../inputs/TextInput';
import Placeholder from '../buttons/Placeholder';

const FastInput = ({value, inputHandler, addHandler}) => {
  return [
    <PlusButton key="1" onClick={addHandler} />,
    <TextInput
      key="2"
      value={value}
      bottomBorderOnly
      onChange={inputHandler}
    />,
    <Placeholder key="3" />
  ];
}

export default FastInput;