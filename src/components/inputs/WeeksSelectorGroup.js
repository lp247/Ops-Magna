import React from 'react';
import {List, Range} from 'immutable';

import Subsection from '../container/Subsection';
import FlexContainer from '../container/FlexContainer';
import Selector from '../buttons/Selector';

const WeeksSelectorGroup = ({entity, toggleWeek, toggleDay}) => (
  <Subsection>
    {entity.getIn(['tmp', 'months']).size > 0
      ? <FlexContainer jc='space-between' wrp>
        <Selector
          width='46px'
          margin='12px 0px 0px 0px'
          square
          selected={entity.getIn(['tmp', 'weeks']).size === 5}
          onClick={() => toggleWeek('all')}
        >Λ</Selector>
        {List(Range(1, 6)).map((val, index) => {
          return (
            <Selector
              key={index}
              width='46px'
              margin='12px 0px 0px 0px'
              square
              selected={entity.getIn(['tmp', 'weeks']).includes(val)}
              onClick={() => toggleWeek(val)}
            >{val}.</Selector>
          );
        })}
      </FlexContainer>
      : <FlexContainer jc='space-between' wrp>
        <Selector
          width='46px'
          margin='3px 0px 0px 0px'
          square
          selected={entity.getIn(['tmp', 'weeks']).size === 53}
          onClick={() => toggleWeek('all')}
        >Λ</Selector>
        {List(Range(1, 54)).map((val, index) => {
          return (
            <Selector
              key={index}
              width='46px'
              margin='3px 0px 0px 0px'
              square
              selected={entity.getIn(['tmp', 'weeks']).includes(val)}
              onClick={() => toggleWeek(val)}
            >w{val}</Selector>
          );
        })}
      </FlexContainer>
    }
  </Subsection>
);

export default WeeksSelectorGroup;