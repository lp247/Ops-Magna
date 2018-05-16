import React from 'react';

import Subsection from '../container/Subsection';
import FlexContainer from '../container/FlexContainer';
import DateInput from '../inputs/DateInput';
import TimeInput from '../inputs/TimeInput';
import {StartDateLabel, EndDateLabel, TimeLabel} from '../../utils/translations';

const StartEndTimeSelectorGroup = ({entity, updateStart, updateEnd, updateTime, lang}) => (
  <Subsection>
    <FlexContainer jc='space-between'>
      <DateInput
        width='35%'
        value={entity.getIn(['tmp', 'start'])}
        onChange={e => updateStart(e.target.value)}
      >{StartDateLabel[lang]}</DateInput>
      <DateInput
        width='35%'
        value={entity.getIn(['tmp', 'end'])}
        onChange={e => updateEnd(e.target.value)}
      >{EndDateLabel[lang]}</DateInput>
      <TimeInput
        width='20%'
        value={entity.getIn(['tmp', 'time'])}
        onChange={e => updateTime(e.target.value)}
      >{TimeLabel[lang]}</TimeInput>
    </FlexContainer>
  </Subsection>
);

export default StartEndTimeSelectorGroup;