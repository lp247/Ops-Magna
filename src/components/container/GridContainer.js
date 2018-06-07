import styled from 'styled-components';

const getJustification = (place) => {
  switch(place) {
    case 'tl': return 'start';
    case 'ml': return 'start';
    case 'bl': return 'start';
    case 'tm': return 'center';
    case 'mm': return 'center';
    case 'bm': return 'center';
    case 'tr': return 'end';
    case 'mr': return 'end';
    case 'br': return 'end';
    default: return 'center';
  }
}

const getAlignment = (place) => {
  switch(place) {
    case 'tl': return 'start';
    case 'ml': return 'center';
    case 'bl': return 'end';
    case 'tm': return 'start';
    case 'mm': return 'center';
    case 'bm': return 'end';
    case 'tr': return 'start';
    case 'mr': return 'center';
    case 'br': return 'end';
    default: return 'center';
  }
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.gtc};
  grid-template-rows: ${props => props.gtr || 'auto'};
  justify-items: ${props => getJustification(props.placement)};
  align-items: ${props => getAlignment(props.placement)};
  justify-content: ${props => props.jc || 'space-between'};
  grid-row-gap: ${props => props.grg || '0'};
  grid-column-gap: ${props => props.gcg || '0'};
  margin: ${props => props.margin || '0 0 0 0'};
  grid-auto-rows: ${props => props.gar || 'auto'};
  /* border: 1px solid white; */
`;

export default GridContainer;