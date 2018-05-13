import React from 'react';

import Subsection from '../container/Subsection';
import TextInput from '../inputs/TextInput';

const SummInput = ({entity, updateSummary}) => (
  <Subsection>
    <TextInput
      value={entity.getIn(['tmp', 'summ'])}
      onChange={e => updateSummary(e.target.value)}
    >Kurzbeschreibung</TextInput>
  </Subsection>
);

export default SummInput;