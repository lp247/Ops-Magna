import React from 'react';

import Subsection from '../container/Subsection';
import FlexContainer from '../container/FlexContainer';
import TextButton from './TextButton';

const FormButtonGroup = ({showDelete, save, discard, del}) => (
  <Subsection>
    <FlexContainer jc='space-evenly'>
      <TextButton
        onClick={save}
      >Speichern</TextButton>
      <TextButton
        padding={8}
        onClick={discard}
      >Abbrechen</TextButton>
      {showDelete
        ? null
        : <TextButton
          padding={8}
          onClick={del}
        >Löschen</TextButton>
      }
    </FlexContainer>
  </Subsection>
);

export default FormButtonGroup;