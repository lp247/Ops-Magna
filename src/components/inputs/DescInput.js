import React from 'react';

import Subsection from '../container/Subsection';
import TextInput from '../inputs/TextInput';
import {DescriptionLabel} from '../../utils/translations';

const DescInput = ({entity, updateDescription, lang}) => (
  <Subsection>
    <TextInput
      value={entity.getIn(['tmp', 'desc'])}
      onChange={e => updateDescription(e.target.value)}
    >{DescriptionLabel[lang]}</TextInput>
  </Subsection>
);

export default DescInput;