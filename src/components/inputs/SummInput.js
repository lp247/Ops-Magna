import React from 'react';

import Subsection from '../container/Subsection';
import TextInput from '../inputs/TextInput';
import {SummaryLabel} from '../../utils/translations';

const SummInput = ({entity, updateSummary, lang}) => (
  <Subsection>
    <TextInput
      value={entity.getIn(['tmp', 'summ'])}
      onChange={e => updateSummary(e.target.value)}
    >{SummaryLabel[lang]}</TextInput>
  </Subsection>
);

export default SummInput;