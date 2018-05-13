import React from 'react';

import Subsection from '../container/Subsection';
import TextInput from '../inputs/TextInput';

const DescInput = ({entity, updateDescription}) => (
  <Subsection>
    <TextInput
      value={entity.getIn(['tmp', 'desc'])}
      onChange={e => updateDescription(e.target.value)}
      >Beschreibung</TextInput>
  </Subsection>
);

export default DescInput;