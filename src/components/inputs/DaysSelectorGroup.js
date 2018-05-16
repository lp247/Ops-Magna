import React from 'react';
import {List, Range} from 'immutable';
import moment from 'moment';

import Subsection from '../container/Subsection';
import FlexContainer from '../container/FlexContainer';
import Selector from '../buttons/Selector';
import DateInput from '../inputs/DateInput';
import {DAY_CHANGE_HOUR} from '../../utils/constants';

const DaysSelectorGroup = ({entity, toggleDay}) => (
  <Subsection>
    {entity.getIn(['tmp', 'weeks']).size > 0
      ? <FlexContainer jc='space-between'>
        <Selector
          width='48px'
          square
          selected={entity.getIn(['tmp', 'days']).size === 7}
          onClick={() => toggleDay('all')}
        >Λ</Selector>
        {List(['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']).map((val, index) => {
          return (
            <Selector
              key={index}
              width='48px'
              square
              selected={entity.getIn(['tmp', 'days']).includes(index + 1)}
              onClick={() => toggleDay(index + 1)}
            >{val}</Selector>
          );
        })}
      </FlexContainer>
      : entity.getIn(['tmp', 'months']).size > 0
        ? <FlexContainer jc='space-between' wrp>
          <Selector
            width='46px'
            margin='3px 0px 0px 0px'
            square
            selected={entity.getIn(['tmp', 'days']).size === 31}
            onClick={() => toggleDay('all')}
          >Λ</Selector>
          {List(Range(1, 32)).map((val, index) => {
            return (
              <Selector
                key={index}
                width='46px'
                margin='3px 0px 0px 0px'
                square
                selected={entity.getIn(['tmp', 'days']).includes(val)}
                onClick={() => toggleDay(val)}
              >{val}</Selector>
            );
          })}
          <Selector width='46px' margin='3px 0px 0px 0px' square invisible></Selector>
          <Selector width='46px' margin='3px 0px 0px 0px' square invisible></Selector>
          <Selector width='46px' margin='3px 0px 0px 0px' square invisible></Selector>
          <Selector width='46px' margin='3px 0px 0px 0px' square invisible></Selector>
        </FlexContainer>
        : [<FlexContainer key='1' jc='space-around'>
          <DateInput
            width='35%'
            value={''}
            onChange={(e) => toggleDay(moment(e.target.value).dayOfYear())}
          ></DateInput>
          <Selector
            width='48px'
            square
            selected={entity.getIn(['tmp', 'days']).size ===
              365 + moment().subtract(DAY_CHANGE_HOUR, 'hours').isLeapYear()}
            onClick={() => toggleDay('all')}
          >Λ</Selector>
        </FlexContainer>,
        <FlexContainer key='2' jc='space-between' wrp>
          {entity.getIn(['tmp', 'days']).map((val, index) => {
            return (
              <Selector
                key={index + 3}
                margin='12px 0px 0px 0px'
                selected
                onClick={() => toggleDay(val)}
              >{moment(val, 'DDD').format('MM-DD')}</Selector>
            );
          })}
          {List(Range(0, (6 - entity.getIn(['tmp', 'days']).size % 6) % 6))
            .map((val, index) => <Selector key={index} margin='12px 0px 0px 0px' invisible>01-01</Selector>)}
        </FlexContainer>]
    }
  </Subsection>
);

export default DaysSelectorGroup;