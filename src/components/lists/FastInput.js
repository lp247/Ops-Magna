import React from 'react';
import TCell from '../table/TCell';
import PlusButton from '../buttons/PlusButton';
import TextInput from '../inputs/TextInput';
import Placeholder from '../buttons/Placeholder';

const FastInput = ({value, handler}) => {
  return (
    <tr>
      <TCell><PlusButton /></TCell>
      <TCell
        primary
      >
        <TextInput
          value={value}
          bottomBorderOnly
          onChange={handler}
        />
      </TCell>
      <TCell><Placeholder /></TCell>
    </tr>
  );
}

export default FastInput;