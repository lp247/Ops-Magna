import styled from 'styled-components';
import {FONT_COLOR} from '../../utils/constants';

const Header = styled.p`
  font-size: 1.8rem;
  /* font-weight: 400; */
  margin: ${props => props.margin || '0 0 0 0'};
  user-select: none;
  color: ${FONT_COLOR};
`;

export default Header;