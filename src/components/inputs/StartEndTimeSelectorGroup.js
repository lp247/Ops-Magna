import React from 'react';

import Subsection from '../container/Subsection';
import FlexContainer from '../container/FlexContainer';
import DateInput from '../inputs/DateInput';
import TimeInput from '../inputs/TimeInput';

const StartEndTimeSelectorGroup = ({entity, updateStart, updateEnd, updateTime}) => (
  <Subsection>
    <FlexContainer jc='space-between'>
      <DateInput
        width='35%'
        value={entity.getIn(['tmp', 'start'])}
        onChange={e => updateStart(e.target.value)}
      >Startdatum</DateInput>
      <DateInput
        width='35%'
        value={entity.getIn(['tmp', 'end'])}
        onChange={e => updateEnd(e.target.value)}
      >Enddatum</DateInput>
      <TimeInput
        width='20%'
        value={entity.getIn(['tmp', 'time'])}
        onChange={e => updateTime(e.target.value)}
      >Uhrzeit</TimeInput>
    </FlexContainer>
  </Subsection>
);

export default StartEndTimeSelectorGroup;