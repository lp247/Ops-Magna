import React from 'react';
import {List, Range} from 'immutable';

import Subsection from '../container/Subsection';
import Selector from '../buttons/Selector';
import GridContainer from '../container/GridContainer';

const WeeksSelectorGroup = ({entity, toggleWeek, toggleDay}) => (
  <Subsection>
    {entity.getIn(['tmp', 'months']).size > 0
      ? <GridContainer gtc={'repeat(7, auto)'} grg={'8px'}>
        <Selector
          square
          selected={entity.getIn(['tmp', 'weeks']).size === 5}
          onClick={() => toggleWeek('all')}
        >Λ</Selector>
        {List(Range(1, 6)).map((val, index) => {
          return (
            <Selector
              key={index}
              square
              selected={entity.getIn(['tmp', 'weeks']).includes(val)}
              onClick={() => toggleWeek(val)}
            >{val}.</Selector>
          );
        })}
        <Selector square invisible />
      </GridContainer>
      : <GridContainer gtc={'repeat(7, auto)'} grg={'8px'}>
        <Selector
          square
          selected={entity.getIn(['tmp', 'weeks']).size === 53}
          onClick={() => toggleWeek('all')}
        >Λ</Selector>
        {List(Range(1, 54)).map((val, index) => {
          return (
            <Selector
              key={index}
              square
              selected={entity.getIn(['tmp', 'weeks']).includes(val)}
              onClick={() => toggleWeek(val)}
            >w{val}</Selector>
          );
        })}
      </GridContainer>
    }
  </Subsection>
);

export default WeeksSelectorGroup;