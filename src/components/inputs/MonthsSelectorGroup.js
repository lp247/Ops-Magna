import React from 'react';
import {List} from 'immutable';

import Subsection from '../container/Subsection';
import FlexContainer from '../container/FlexContainer';
import Selector from '../buttons/Selector';
import {
  JanuaryShort,
  FebruaryShort,
  MarchShort,
  AprilShort,
  MayShort,
  JuneShort,
  JulyShort,
  AugustShort,
  SeptemberShort,
  OctoberShort,
  NovemberShort,
  DecemberShort
} from '../../utils/translations';

const MonthsSelectorGroup = ({entity, toggleMonth, toggleWeek, toggleDay, lang}) => (
  <Subsection>
    <FlexContainer jc='space-between' wrp>
      <Selector
        width='60px'
        margin='8px 0px 0px 0px'
        square
        selected={entity.getIn(['tmp', 'months']).size === 12}
        onClick={() => toggleMonth('all')}
      >Λ</Selector>
      {List([
        JanuaryShort[lang],
        FebruaryShort[lang],
        MarchShort[lang],
        AprilShort[lang],
        MayShort[lang],
        JuneShort[lang],
        JulyShort[lang],
        AugustShort[lang],
        SeptemberShort[lang],
        OctoberShort[lang],
        NovemberShort[lang],
        DecemberShort[lang]
      ]).map((val, index) => {
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

export default MonthsSelectorGroup;