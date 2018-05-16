import React from 'react';

import Section from '../container/Section';
import Header from '../texts/Header';
import MonthsSelectorGroup from '../inputs/MonthsSelectorGroup';
import WeeksSelectorGroup from '../inputs/WeeksSelectorGroup';
import DaysSelectorGroup from '../inputs/DaysSelectorGroup';
import StartEndTimeSelectorGroup from '../inputs/StartEndTimeSelectorGroup';
import SummInput from '../inputs/SummInput';
import DescInput from '../inputs/DescInput';
import FormButtonGroup from '../buttons/FormButtonGroup';
import NSelectorGroup from '../inputs/NSelectorGroup';

const RawTemplateForm = ({
  entity,
  header,
  showDelete,
  updateSummary,
  updateDescription,
  updateN,
  toggleMonth,
  toggleWeek,
  toggleDay,
  updateTime,
  updateStart,
  updateEnd,
  save,
  discard,
  del
}) => (
  <Section>
    <Header>{header}</Header>
    <MonthsSelectorGroup
      entity={entity}
      toggleMonth={toggleMonth}
      toggleWeek={toggleWeek}
      toggleDay={toggleDay}
    />,
    <WeeksSelectorGroup
      entity={entity}
      toggleWeek={toggleWeek}
      toggleDay={toggleDay}
    />,
    <DaysSelectorGroup
      entity={entity}
      toggleDay={toggleDay}
    />,
    <StartEndTimeSelectorGroup
      entity={entity}
      updateStart={updateStart}
      updateEnd={updateEnd}
      updateTime={updateTime}
    />
    <NSelectorGroup
      entity={entity}
      updateN={updateN}
    />
    <SummInput entity={entity} updateSummary={updateSummary} />
    <DescInput entity={entity} updateDescription={updateDescription} />
    <FormButtonGroup showDelete={showDelete} save={save} discard={discard} del={del} />
  </Section>
);

export default RawTemplateForm;