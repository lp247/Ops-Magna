import React from 'react';

import TextButton from "../buttons/TextButton";
import FlexContainer from '../container/FlexContainer';
import ModalBackground from './ModalBackground';
import ModalTextField from './ModalTextField';
import ModalWindow from './ModalWindow';
import {
  yesText,
  noText,
  abortText,
  okText
} from '../../utils/translations';

export const ModalYesNoAbort = ({show, yesAction, noAction, abortAction, lang, children}) => {
	if (show) {
    return (
      <ModalBackground>
        <ModalWindow>
          <ModalTextField>
            {children}
          </ModalTextField>
          <FlexContainer jc='space-evenly'>
            <TextButton onClick={yesAction}>{yesText[lang]}</TextButton>
            <TextButton onClick={noAction}>{noText[lang]}</TextButton>
            <TextButton onClick={noAction}>{abortText[lang]}</TextButton>
          </FlexContainer>
        </ModalWindow>
      </ModalBackground>
    );
  } else {
    return null;
  }
}

export const ModalYesNo = ({show, yesAction, noAction, lang, children}) => {
	if (show) {
    return (
      <ModalBackground>
        <ModalWindow>
          <ModalTextField>
            {children}
          </ModalTextField>
          <FlexContainer jc='space-evenly'>
            <TextButton onClick={yesAction}>{yesText[lang]}</TextButton>
            <TextButton onClick={noAction}>{noText[lang]}</TextButton>
          </FlexContainer>
        </ModalWindow>
      </ModalBackground>
    );
  } else {
    return null;
  }
}

export const ModalOK = ({show, okAction, lang, children}) => {
  if (show) {
    return (
      <ModalBackground>
        <ModalWindow>
          <ModalTextField>
            {children}
          </ModalTextField>
          <FlexContainer jc='space-evenly'>
            <TextButton onClick={okAction}>{okText[lang]}</TextButton>
          </FlexContainer>
        </ModalWindow>
      </ModalBackground>
    );
  } else {
    return null;
  }
}