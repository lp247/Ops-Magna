import React from 'react';

import Subsection from '../container/Subsection';
import FlexContainer from '../container/FlexContainer';
import TextButton from './TextButton';
import {SaveButtonText, AbortButtonText, DeleteButtonText} from '../../utils/translations';

const FormButtonGroup = ({showDelete, save, discard, del, lang}) => (
  <Subsection>
    <FlexContainer jc='space-evenly' wrp>
      <TextButton
        margin="0 4px 8px"
        padding="8px"
        onClick={save}
      >{SaveButtonText[lang]}</TextButton>
      <TextButton
        margin="0 4px 8px"
        padding="8px"
        onClick={discard}
      >{AbortButtonText[lang]}</TextButton>
      {showDelete
        ? null
        : <TextButton
          margin="0 4px 8px"
          padding="8px"
          onClick={del}
        >{DeleteButtonText[lang]}</TextButton>
      }
    </FlexContainer>
  </Subsection>
);

export default FormButtonGroup;