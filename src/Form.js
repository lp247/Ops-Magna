import React from 'react';
import {List, Range} from 'immutable';

import {
  FlexContainer, Section, Subsection
} from './sc/container';
import {
  Header
} from './sc/texts';
import {
  Input
} from './sc/inputs';
import {
  TextButton, Selector
} from './sc/textbuttons';
import taresize from './taresize';

const togglePeriod = (list, value) => {
  if (List.isList(value)) {
    if (list.size === value.size) {
      return List();
    } else {
      return value;
    }
  } else {
    if (list.includes(value)) {
      let index = list.findIndex(v => v === value);
      return list.delete(index);
    } else {
      return list.push(value);
    }
  }
}

const Form = ({header, data, updateKeyValue, save, discard, del}) => (
  <Section>
    <Header>{header}</Header>
    <Subsection>
      <FlexContainer jc='space-evenly'>
        <Selector
          selected={data.get('data').get('single')}
          onClick={() => updateKeyValue(data.get('data').get('id'), 'single', true)}
        >Einmalig</Selector>
        <Selector
          selected={!data.get('data').get('single')}
          onClick={() => updateKeyValue(data.get('data').get('id'), 'single', false)}
        >Regelmäßig</Selector>
      </FlexContainer>
    </Subsection>
    {data.get('data').get('single')
      ? <Subsection>
        <FlexContainer jc='space-between'>
          <Input
            type='date'
            width='60%'
            value={data.get('data').get('start')}
            onChange={e => updateKeyValue(data.get('data').get('id'), 'start', e.target.value)}
          >Datum</Input>
          <Input
            type='time'
            width='30%'
            value={data.get('data').get('time')}
            onChange={e => updateKeyValue(data.get('data').get('id'), 'time', e.target.value)}
          >Uhrzeit</Input>
        </FlexContainer>
      </Subsection>
      : [
        <Subsection key='1'>
          <FlexContainer jc='space-between'>
            <Selector
              width='48px'
              square
              selected={data.get('data').get('months').size === 12}
              onClick={() => {
                let toggledMonths = togglePeriod(data.get('data').get('months'), List(Range(0, 12)));
                if (data.get('data').get('months').isEmpty() || toggledMonths.isEmpty()) {
                  updateKeyValue(data.get('data').get('id'), 'weeks', List());
                  updateKeyValue(data.get('data').get('id'), 'days', List());
                }
                updateKeyValue(data.get('data').get('id'), 'months', toggledMonths);
              }}
            >Λ</Selector>
            {List(['J', 'F', 'M', 'A', 'M', 'J']).map((val, index) => {
              return (
                <Selector
                  key={index}
                  width='48px'
                  square
                  selected={data.get('data').get('months').includes(index)}
                  onClick={() => {
                    let toggledMonths = togglePeriod(data.get('data').get('months'), index);
                    if (data.get('data').get('months').isEmpty() || toggledMonths.isEmpty()) {
                      updateKeyValue(data.get('data').get('id'), 'weeks', List());
                      updateKeyValue(data.get('data').get('id'), 'days', List());
                    }
                    updateKeyValue(data.get('data').get('id'), 'months', toggledMonths);
                  }}
                >{val}</Selector>
              );
            })}
          </FlexContainer>
          <FlexContainer jc='space-between'>
            <Selector width='48px' square invisible></Selector>
            {List(['J', 'A', 'S', 'O', 'N', 'D']).map((val, index) => {
              return (
                <Selector
                  key={index}
                  width='48px'
                  square
                  selected={data.get('data').get('months').includes(index + 6)}
                  onClick={() => {
                    let toggledMonths = togglePeriod(data.get('data').get('months'), index + 6);
                    if (data.get('data').get('months').isEmpty() || toggledMonths.isEmpty()) {
                      updateKeyValue(data.get('data').get('id'), 'weeks', List());
                      updateKeyValue(data.get('data').get('id'), 'days', List());
                    }
                    updateKeyValue(data.get('data').get('id'), 'months', toggledMonths);
                  }}
                >{val}</Selector>
              );
            })}
          </FlexContainer>
        </Subsection>,
        <Subsection key='2'>
          {data.get('data').get('months').size > 0
            ? <FlexContainer jc='space-between' wrap='true'>
              <Selector
                width='48px'
                square
                selected={data.get('data').get('weeks').size === 5}
                onClick={() => {
                  let toggledWeeks = togglePeriod(data.get('data').get('weeks'), List(Range(1, 6)));
                  if (data.get('data').get('weeks').isEmpty() || toggledWeeks.isEmpty()) {
                    updateKeyValue(data.get('data').get('id'), 'days', List());
                  }
                  updateKeyValue(data.get('data').get('id'), 'weeks', toggledWeeks);
                }}
              >Λ</Selector>
              {List(Range(1, 6)).map((val, index) => {
                return (
                  <Selector
                    key={index}
                    width='48px'
                    square
                    selected={data.get('data').get('weeks').includes(val)}
                    onClick={() => {
                      let toggledWeeks = togglePeriod(data.get('data').get('weeks'), val);
                      if (data.get('data').get('weeks').isEmpty() || toggledWeeks.isEmpty()) {
                        updateKeyValue(data.get('data').get('id'), 'days', List());
                      }
                      updateKeyValue(data.get('data').get('id'), 'weeks', toggledWeeks);
                    }}
                  >{val}.</Selector>
                );
              })}
            </FlexContainer>
            : <FlexContainer jc='space-between' wrap='true'>
              <Selector
                width='48px'
                square
                selected={data.get('data').get('weeks').size === 52}
                onClick={() => {
                  let toggledWeeks = togglePeriod(data.get('data').get('weeks'), List(Range(1, 54)));
                  if (data.get('data').get('weeks').isEmpty() || toggledWeeks.isEmpty()) {
                    updateKeyValue(data.get('data').get('id'), 'days', List());
                  }
                  updateKeyValue(data.get('data').get('id'), 'weeks', toggledWeeks);
                }}
              >Λ</Selector>
              {List(Range(1, 54)).map((val, index) => {
                return (
                  <Selector
                    key={index}
                    width='48px'
                    square
                    selected={data.get('data').get('weeks').includes(val)}
                    onClick={() => {
                      let toggledWeeks = togglePeriod(data.get('data').get('weeks'), val);
                      if (data.get('data').get('weeks').isEmpty() || toggledWeeks.isEmpty()) {
                        updateKeyValue(data.get('data').get('id'), 'days', List());
                      }
                      updateKeyValue(data.get('data').get('id'), 'weeks', toggledWeeks);
                    }}
                  >w{val}</Selector>
                );
              })}
              <Selector width='48px' square invisible></Selector>
            </FlexContainer>
          }
        </Subsection>,
        <Subsection key='3'>
          {data.get('data').get('weeks').size > 0
            ? <FlexContainer jc='space-between'>
              <Selector
                width='48px'
                square
                selected={data.get('data').get('days').size === 7}
                onClick={() => {
                  let toggledDays = togglePeriod(data.get('data').get('days'), List(Range(1, 8)));
                  updateKeyValue(data.get('data').get('id'), 'days', toggledDays);
                }}
              >Λ</Selector>
              {List(['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']).map((val, index, list) => {
                return (
                  <Selector
                    key={index}
                    width='48px'
                    square
                    selected={data.get('data').get('days').includes(index + 1)}
                    onClick={() => {
                      let toggledDays = togglePeriod(data.get('data').get('days'), index + 1);
                      updateKeyValue(data.get('data').get('id'), 'days', toggledDays);
                    }}
                  >{val}</Selector>
                );
              })}
            </FlexContainer>
            : data.get('data').get('months').size > 0
              ? <FlexContainer jc='space-between' wrap='true'>
                <Selector
                  width='48px'
                  square
                  selected={data.get('data').get('days').size === 31}
                  onClick={() => {
                    let toggledDays = togglePeriod(data.get('data').get('days'), List(Range(1, 32)));
                    updateKeyValue(data.get('data').get('id'), 'days', toggledDays);
                  }}
                >Λ</Selector>
                {List(Range(1, 32)).map((val, index) => {
                  return (
                    <Selector
                      key={index}
                      width='48px'
                      square
                      selected={data.get('data').get('days').includes(val)}
                      onClick={() => {
                        let toggledDays = togglePeriod(data.get('data').get('days'), val);
                        updateKeyValue(data.get('data').get('id'), 'days', toggledDays);
                      }}
                    >{val}</Selector>
                  );
                })}
                <Selector width='48px' square invisible></Selector>
                <Selector width='48px' square invisible></Selector>
                <Selector width='48px' square invisible></Selector>
                <Selector width='48px' square invisible></Selector>
              </FlexContainer>
              : null
          }
        </Subsection>,
        <Subsection key='4'>
          <FlexContainer jc='space-between'>
            <Input
              type='date'
              width='35%'
              value={data.get('data').get('start')}
              onChange={e => updateKeyValue(data.get('data').get('id'), 'start', e.target.value)}
            >Startdatum</Input>
            <Input
              type='date'
              width='35%'
              value={data.get('data').get('end')}
              onChange={e => updateKeyValue(data.get('data').get('id'), 'end', e.target.value)}
            >Enddatum</Input>
            <Input
              type='time'
              width='20%'
              value={data.get('data').get('time')}
              onChange={e => updateKeyValue(data.get('data').get('id'), 'time', e.target.value)}
            >Uhrzeit</Input>
          </FlexContainer>
        </Subsection>
      ]
    }
    <Subsection>
      <Input
        type='text'
        value={data.get('data').get('summ')}
        onChange={e => updateKeyValue(data.get('data').get('id'), 'summ', e.target.value)}
      >Kurzbeschreibung</Input>
    </Subsection>
    <Subsection>
      <Input
        type='textarea'
        value={data.get('data').get('desc')}
        onChange={e => {
          updateKeyValue(data.get('data').get('id'), 'desc', e.target.value);
          taresize(e.target);
        }}
        >Beschreibung</Input>
    </Subsection>
    <Subsection>
      <FlexContainer jc='space-evenly'>
        <TextButton
          onClick={() => save(data.get('data').get('id'))}
        >Speichern</TextButton>
        <TextButton
          padding={8}
          onClick={() => discard(data.get('data').get('id'))}
        >Abbrechen</TextButton>
        {data.get('data').get('id') === 'new'
          ? null
          : <TextButton
            padding={8}
            onClick={() => {
              if (window.confirm('Möchten Sie den Eintrag wirklich löschen?')) del(data.get('data').get('id'));
            }}
          >Löschen</TextButton>
        }
      </FlexContainer>
    </Subsection>
  </Section>
);

export default Form;