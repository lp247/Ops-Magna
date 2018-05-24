import styled from 'styled-components';

import {ACCENT_COLOR, TRANSPARENT} from '../../utils/constants';

const getLength = (defaultcss) => (isSquare, size) => {
  if (isSquare) {
    switch (size) {
      // case 'big': return '56px';
      // case 'small': return '40px';
      // default: return '48px';
      case 'big': return '2.8rem';
      case 'small': return '2.0rem';
      default: return '2.5rem';
    }
  } else {
    return defaultcss;
  }
}

const getWidthHeight = getLength('auto');
const getLineHeight = getLength('normal');

const getFontSize = (size) => {
  switch (size) {
    case 'big': return '1.4rem';
    case 'small': return '1.0rem';
    default: return '1.25rem';
  }
}

const Selector = styled.p`
  cursor: ${props => props.invisible ? 'auto' : 'pointer'};
  padding: 0;
  margin: ${props => props.margin || '0'};
  width: ${props => getWidthHeight(props.square, props.size)};
  height: ${props => getWidthHeight(props.square, props.size)};
  text-align: center;
  font-size: ${props => getFontSize(props.size)};
  line-height: ${props => getLineHeight(props.square, props.size)};
  border: 2px solid ${props => props.selected && !props.invisible ? ACCENT_COLOR : TRANSPARENT};
  color: ${props => props.invisible ? TRANSPARENT : ACCENT_COLOR};
`;

export default Selector;