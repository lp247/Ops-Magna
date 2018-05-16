import React from 'react';

import Subsection from '../container/Subsection';
import FlexContainer from '../container/FlexContainer';
import NumberInput from '../inputs/NumberInput';
import BasicSpan from '../texts/BasicSpan';
import {OfText, RecurrencesText} from '../../utils/translations';

const NSelectorGroup = ({entity, updateN, lang}) => (
  <Subsection>
    <FlexContainer jc='space-around'>
			<BasicSpan>{RecurrencesText[lang]}</BasicSpan>
			<BasicSpan>{entity.getIn(['tmp', 'cnt'])}</BasicSpan>
			<BasicSpan>{OfText[lang]}</BasicSpan>
      <NumberInput
        width='10%'
        value={entity.getIn(['tmp', 'n'])}
        onChange={e => updateN(e.target.value)}
      />
    </FlexContainer>
  </Subsection>
);

export default NSelectorGroup;