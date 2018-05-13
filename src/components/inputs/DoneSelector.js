import React from 'react';

import Subsection from '../container/Subsection';
import FlexContainer from '../container/FlexContainer';
import Selector from '../buttons/Selector';

const DoneSelector = ({entity, updateDone}) => (
  <Subsection>
    <FlexContainer jc='left'>
      <Selector
        selected={entity.getIn(['tmp', 'done'])}
        onClick={updateDone}
      >{entity.getIn(['tmp', 'done']) ? 'Erledigt' : 'Nicht erledigt'}</Selector>
    </FlexContainer>
  </Subsection>
);

export default DoneSelector;