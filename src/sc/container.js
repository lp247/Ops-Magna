import styled from 'styled-components';

import {
  BACKGROUND_COLOR,
  FONT_COLOR
} from '../utils/constants';

export const Page = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: ${BACKGROUND_COLOR};
  color: ${FONT_COLOR};
`;

export const ContentWrapper = styled.div`
  @media (min-width: 501px) {
    width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 500px) {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
  box-sizing: border-box;
  padding: 48px 12px;
`;

export const Section = styled.div`
  margin-bottom: 64px;
  opacity: ${props => props.opacity || 1};
`;

export const Subsection = styled.div`
  margin-bottom: 12px;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: ${props => props.jc};
  align-items: center;
  flex-flow: ${props => props.wrap ? 'row wrap' : 'row nowrap'};
  margin-bottom: 8px;
`;