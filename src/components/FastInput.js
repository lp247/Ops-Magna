import React from 'react';
import {TCell} from '../sc/table';
import {Placeholder} from '../sc/buttons';
import Textinput from '../sc/Textinput';

const FastInput = ({value, handler}) => {
  return <tr>
    <TCell><Placeholder size='16px' /></TCell>
    <TCell primary>
      <Textinput value={value} onChange={handler} />
    </TCell>
    <TCell><Placeholder size='16px' /></TCell>
  </tr>;
}

export default FastInput;