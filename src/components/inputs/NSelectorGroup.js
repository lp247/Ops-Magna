import React from 'react';

import Subsection from '../container/Subsection';
import NumberInput from '../inputs/NumberInput';
import {RecurrencesText, alreadyText} from '../../utils/translations';
import Selector from '../buttons/Selector';
import FlexContainer from '../container/FlexContainer';

const NSelectorGroup = ({entity, updateN, lang}) => {
  let number = entity.getIn(['tmp', 'n']);
  let cnt = entity.get('cnt');
  let label = RecurrencesText[lang] + ' (' + cnt + ' ' + alreadyText[lang] + ')';
  return (
    <Subsection>
      <FlexContainer>
        <NumberInput
          width='80%'
          value={number}
          onChange={e => updateN(parseInt(e.target.value, 10))}
        >{label}</NumberInput>
        <Selector
          square
          margin="14px 0 0 20px"
          selected={number === -1}
          onClick={() => updateN(-1)}
        >∞</Selector>
      </FlexContainer>
    </Subsection>
  );
};

export default NSelectorGroup;