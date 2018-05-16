import React from 'react';

import Subsection from '../container/Subsection';
import FlexContainer from '../container/FlexContainer';
import DateInput from '../inputs/DateInput';
import TimeInput from '../inputs/TimeInput';
import {DateLabel, TimeLabel} from '../../utils/translations';

const DateTimeSelectorGroup = ({entity, updateDate, updateTime, lang}) => (
  <Subsection>
    <FlexContainer jc='space-between'>
      <DateInput
        width='60%'
        value={entity.getIn(['tmp', 'date'])}
        onChange={e => updateDate(e.target.value)}
      >{DateLabel[lang]}</DateInput>
      <TimeInput
        width='30%'
        value={entity.getIn(['tmp', 'time'])}
        onChange={e => updateTime(e.target.value)}
      >{TimeLabel[lang]}</TimeInput>
    </FlexContainer>
  </Subsection>
);

export default DateTimeSelectorGroup;