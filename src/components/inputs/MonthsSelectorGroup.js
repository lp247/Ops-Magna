import React from 'react';
import {List} from 'immutable';

import Subsection from '../container/Subsection';
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
import GridContainer from '../container/GridContainer';

const MonthsSelectorGroup = ({entity, toggleMonth, toggleWeek, toggleDay, lang}) => (
  <Subsection>
    <GridContainer gtc={'repeat(7, auto)'} grg={'8px'}>
      <Selector
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
            square
            selected={entity.getIn(['tmp', 'months']).includes(index)}
            onClick={() => toggleMonth(index)}
          >{val}</Selector>
        );
      })}
    </GridContainer>
  </Subsection>
);

export default MonthsSelectorGroup;