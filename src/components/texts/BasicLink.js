import styled from 'styled-components';

import {ACCENT_COLOR, ACCENT_COLOR_DARKER} from '../../utils/constants';

const BasicLink = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  user-select: none;
  background-color: ${ACCENT_COLOR};
  /* white-space: nowrap; */
  &:hover {
    background-color: ${ACCENT_COLOR_DARKER};
  }
`;

export default BasicLink;