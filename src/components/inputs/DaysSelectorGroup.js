import React from 'react';
import {List, Range} from 'immutable';
import moment from 'moment';

import Subsection from '../container/Subsection';
import Selector from '../buttons/Selector';
import DateInput from '../inputs/DateInput';
import {DAY_CHANGE_HOUR} from '../../utils/constants';
import GridContainer from '../container/GridContainer';

const DaysSelectorGroup = ({entity, toggleDay}) => (
  <Subsection>
    {entity.getIn(['tmp', 'weeks']).size > 0
      ? <GridContainer gtc={'repeat(7, auto)'} grg={'8px'}>
        <Selector
          square
          small
          selected={entity.getIn(['tmp', 'days']).size === 7}
          onClick={() => toggleDay('all')}
        >Λ</Selector>
        {List(['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']).map((val, index) => {
          return (
            <Selector
              key={index}
              square
              selected={entity.getIn(['tmp', 'days']).includes(index + 1)}
              onClick={() => toggleDay(index + 1)}
            >{val}</Selector>
          );
        })}
      </GridContainer>
      : entity.getIn(['tmp', 'months']).size > 0
        ? <GridContainer gtc={'repeat(7, auto)'} grg={'8px'}>
          <Selector
            square
            selected={entity.getIn(['tmp', 'days']).size === 31}
            onClick={() => toggleDay('all')}
          >Λ</Selector>
          {List(Range(1, 32)).map((val, index) => {
            return (
              <Selector
                key={index}
                square
                selected={entity.getIn(['tmp', 'days']).includes(val)}
                onClick={() => toggleDay(val)}
              >{val}</Selector>
            );
          })}
        </GridContainer>
        : [<GridContainer key='1' gtc={'repeat(7, auto)'} grg={'8px'}>
          <DateInput
            width='35%'
            value={''}
            onChange={(e) => toggleDay(moment(e.target.value).dayOfYear())}
          ></DateInput>
          <Selector
            square
            selected={entity.getIn(['tmp', 'days']).size ===
              365 + moment().subtract(DAY_CHANGE_HOUR, 'hours').isLeapYear()}
            onClick={() => toggleDay('all')}
          >Λ</Selector>
        </GridContainer>,
        <GridContainer key='2' gtc={'repeat(7, auto)'} grg={'8px'}>
          {entity.getIn(['tmp', 'days']).map((val, index) => {
            return (
              <Selector
                key={index + 3}
                selected
                onClick={() => toggleDay(val)}
              >{moment(val, 'DDD').format('MM-DD')}</Selector>
            );
          })}
          {List(Range(0, (6 - entity.getIn(['tmp', 'days']).size % 6) % 6))
            .map((val, index) => <Selector key={index} invisible>01-01</Selector>)}
        </GridContainer>]
    }
  </Subsection>
);

export default DaysSelectorGroup;