import React from 'react';

import Subsection from '../container/Subsection';
import FlexContainer from '../container/FlexContainer';
import NumberInput from '../inputs/NumberInput';
import BasicSpan from '../texts/BasicSpan';

const StartEndTimeSelectorGroup = ({entity, updateN}) => (
  <Subsection>
    <FlexContainer jc='space-around'>
			<BasicSpan>Wiederholungen:</BasicSpan>
			<BasicSpan>{entity.getIn(['tmp', 'cnt'])}</BasicSpan>
			<BasicSpan>von</BasicSpan>
      <NumberInput
        width='10%'
        value={entity.getIn(['tmp', 'n'])}
        onChange={e => updateN(e.target.value)}
      />
    </FlexContainer>
  </Subsection>
);

export default StartEndTimeSelectorGroup;