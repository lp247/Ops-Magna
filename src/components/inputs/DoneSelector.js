import React from 'react';

import Subsection from '../container/Subsection';
import FlexContainer from '../container/FlexContainer';
import Selector from '../buttons/Selector';
import {DoneText, NotDoneText} from '../../utils/translations';

const DoneSelector = ({entity, updateDone, lang}) => (
  <Subsection>
    <FlexContainer jc='left'>
      <Selector
        selected={entity.getIn(['tmp', 'done'])}
        onClick={updateDone}
      >{entity.getIn(['tmp', 'done']) ? DoneText[lang] : NotDoneText[lang]}</Selector>
    </FlexContainer>
  </Subsection>
);

export default DoneSelector;