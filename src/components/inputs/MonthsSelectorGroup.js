import React from 'react';
import {List} from 'immutable';

import Subsection from '../container/Subsection';
import FlexContainer from '../container/FlexContainer';
import Selector from '../buttons/Selector';

const MonthsSelector = ({entity, toggleMonth, toggleWeek, toggleDay}) => (
  <Subsection>
    <FlexContainer jc='space-between' wrp>
      <Selector
        width='60px'
        margin='8px 0px 0px 0px'
        square
        selected={entity.getIn(['tmp', 'months']).size === 12}
        onClick={() => toggleMonth('all')}
      >Λ</Selector>
      {List(['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']).map((val, index) => {
        return (
          <Selector
            key={index}
            width='60px'
            margin='8px 0px 0px 0px'
            square
            selected={entity.getIn(['tmp', 'months']).includes(index)}
            onClick={() => toggleMonth(index)}
          >{val}</Selector>
        );
      })}
    </FlexContainer>
  </Subsection>
);

export default MonthsSelector;