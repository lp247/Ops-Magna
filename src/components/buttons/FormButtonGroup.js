import React from 'react';

import Subsection from '../container/Subsection';
import FlexContainer from '../container/FlexContainer';
import TextButton from './TextButton';
import {SaveButtonText, AbortButtonText, DeleteButtonText} from '../../utils/translations';

const FormButtonGroup = ({showDelete, save, discard, del, lang}) => (
  <Subsection>
    <FlexContainer jc='space-evenly'>
      <TextButton
        onClick={save}
      >{SaveButtonText[lang]}</TextButton>
      <TextButton
        padding={8}
        onClick={discard}
      >{AbortButtonText[lang]}</TextButton>
      {showDelete
        ? null
        : <TextButton
          padding={8}
          onClick={del}
        >{DeleteButtonText[lang]}</TextButton>
      }
    </FlexContainer>
  </Subsection>
);

export default FormButtonGroup;