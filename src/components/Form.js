import React from 'react';
import {List, Range} from 'immutable';
import moment from 'moment';

import {
  FlexContainer, Section, Subsection
} from '../sc/container';
import {
  Header
} from '../sc/texts';
import {
  Input
} from '../sc/inputs';
import {
  TextButton, Selector
} from '../sc/textbuttons';
import taresize from '../utils/taresize';
import { DAY_CHANGE_HOUR } from '../utils/constants';

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

const getHeader = (type, newEntry) => {
  if (type === 'task') {
    if (newEntry) {
      return 'Neue Aufgabe';
    } else {
      return 'Aufgabe bearbeiten';
    }
  } else if (type === 'event') {
    if (newEntry) {
      return 'Neuer Termin';
    } else {
      return 'Termin bearbeiten';
    }
  } else if (type === 'rule') {
    if (newEntry) {
      return 'Neue Regel';
    } else {
      return 'Regel bearbeiten';
    }
  }
}

const RegularitySelector = ({data, updateKeyValue}) => (
  <Subsection>
      <FlexContainer jc='space-evenly'>
        <Selector
          selected={data.getIn(['data', 'single'])}
          onClick={() => updateKeyValue(data.getIn(['data', 'id']), 'single', true)}
        >Einmalig</Selector>
        <Selector
          selected={!data.getIn(['data', 'single'])}
          onClick={() => updateKeyValue(data.getIn(['data', 'id']), 'single', false)}
        >Regelmäßig</Selector>
      </FlexContainer>
    </Subsection>
);

const SingleDateTimeSelector = ({data, updateKeyValue}) => (
  <Subsection>
    <FlexContainer jc='space-between'>
      <Input
        type='date'
        width='60%'
        value={data.getIn(['data', 'start'])}
        onChange={e => updateKeyValue(data.getIn(['data', 'id']), 'start', e.target.value)}
      >Datum</Input>
      <Input
        type='time'
        width='30%'
        value={data.getIn(['data', 'time'])}
        onChange={e => updateKeyValue(data.getIn(['data', 'id']), 'time', e.target.value)}
      >Uhrzeit</Input>
    </FlexContainer>
  </Subsection>
);

const MonthsSelector = ({data, updateKeyValue}) => (
  <Subsection>
    <FlexContainer jc='space-between'>
      <Selector
        width='46px'
        margin='8px 0px 0px 0px'
        square
        selected={data.getIn(['data', 'months']).size === 12}
        onClick={() => {
          let toggledMonths = togglePeriod(data.getIn(['data', 'months']), List(Range(0, 12)));
          if (data.getIn(['data', 'months']).isEmpty() || toggledMonths.isEmpty()) {
            updateKeyValue(data.getIn(['data', 'id']), 'weeks', List());
            updateKeyValue(data.getIn(['data', 'id']), 'days', List());
          }
          updateKeyValue(data.getIn(['data', 'id']), 'months', toggledMonths);
        }}
      >Λ</Selector>
      {List(['J', 'F', 'M', 'A', 'M', 'J']).map((val, index) => {
        return (
          <Selector
            key={index}
            width='46px'
            margin='8px 0px 0px 0px'
            square
            selected={data.getIn(['data', 'months']).includes(index)}
            onClick={() => {
              let toggledMonths = togglePeriod(data.getIn(['data', 'months']), index);
              if (data.getIn(['data', 'months']).isEmpty() || toggledMonths.isEmpty()) {
                updateKeyValue(data.getIn(['data', 'id']), 'weeks', List());
                updateKeyValue(data.getIn(['data', 'id']), 'days', List());
              }
              updateKeyValue(data.getIn(['data', 'id']), 'months', toggledMonths);
            }}
          >{val}</Selector>
        );
      })}
    </FlexContainer>
    <FlexContainer jc='space-between'>
      <Selector width='46px' margin='8px 0px 0px 0px' square invisible></Selector>
      {List(['J', 'A', 'S', 'O', 'N', 'D']).map((val, index) => {
        return (
          <Selector
            key={index}
            width='46px'
            margin='12px 0px 0px 0px'
            square
            selected={data.getIn(['data', 'months']).includes(index + 6)}
            onClick={() => {
              let toggledMonths = togglePeriod(data.getIn(['data', 'months']), index + 6);
              if (data.getIn(['data', 'months']).isEmpty() || toggledMonths.isEmpty()) {
                updateKeyValue(data.getIn(['data', 'id']), 'weeks', List());
                updateKeyValue(data.getIn(['data', 'id']), 'days', List());
              }
              updateKeyValue(data.getIn(['data', 'id']), 'months', toggledMonths);
            }}
          >{val}</Selector>
        );
      })}
    </FlexContainer>
  </Subsection>
);

const WeeksSelector = ({data, updateKeyValue}) => (
  <Subsection>
    {data.getIn(['data', 'months']).size > 0
      ? <FlexContainer jc='space-between' wrap='true'>
        <Selector
          width='46px'
          margin='12px 0px 0px 0px'
          square
          selected={data.getIn(['data', 'weeks']).size === 5}
          onClick={() => {
            let toggledWeeks = togglePeriod(data.getIn(['data', 'weeks']), List(Range(1, 6)));
            if (data.getIn(['data', 'weeks']).isEmpty() || toggledWeeks.isEmpty()) {
              updateKeyValue(data.getIn(['data', 'id']), 'days', List());
            }
            updateKeyValue(data.getIn(['data', 'id']), 'weeks', toggledWeeks);
          }}
        >Λ</Selector>
        {List(Range(1, 6)).map((val, index) => {
          return (
            <Selector
              key={index}
              width='46px'
              margin='12px 0px 0px 0px'
              square
              selected={data.getIn(['data', 'weeks']).includes(val)}
              onClick={() => {
                let toggledWeeks = togglePeriod(data.getIn(['data', 'weeks']), val);
                if (data.getIn(['data', 'weeks']).isEmpty() || toggledWeeks.isEmpty()) {
                  updateKeyValue(data.getIn(['data', 'id']), 'days', List());
                }
                updateKeyValue(data.getIn(['data', 'id']), 'weeks', toggledWeeks);
              }}
            >{val}.</Selector>
          );
        })}
      </FlexContainer>
      : <FlexContainer jc='space-between' wrap='true'>
        <Selector
          width='46px'
          margin='3px 0px 0px 0px'
          square
          selected={data.getIn(['data', 'weeks']).size === 53}
          onClick={() => {
            let toggledWeeks = togglePeriod(data.getIn(['data', 'weeks']), List(Range(1, 54)));
            if (data.getIn(['data', 'weeks']).isEmpty() || toggledWeeks.isEmpty()) {
              updateKeyValue(data.getIn(['data', 'id']), 'days', List());
            }
            updateKeyValue(data.getIn(['data', 'id']), 'weeks', toggledWeeks);
          }}
        >Λ</Selector>
        {List(Range(1, 54)).map((val, index) => {
          return (
            <Selector
              key={index}
              width='46px'
              margin='3px 0px 0px 0px'
              square
              selected={data.getIn(['data', 'weeks']).includes(val)}
              onClick={() => {
                let toggledWeeks = togglePeriod(data.getIn(['data', 'weeks']), val);
                if (data.getIn(['data', 'weeks']).isEmpty() || toggledWeeks.isEmpty()) {
                  updateKeyValue(data.getIn(['data', 'id']), 'days', List());
                }
                updateKeyValue(data.getIn(['data', 'id']), 'weeks', toggledWeeks);
              }}
            >w{val}</Selector>
          );
        })}
      </FlexContainer>
    }
  </Subsection>
);

const DaysSelector = ({data, updateKeyValue}) => (
  <Subsection>
    {data.getIn(['data', 'weeks']).size > 0
      ? <FlexContainer jc='space-between'>
        <Selector
          width='48px'
          square
          selected={data.getIn(['data', 'days']).size === 7}
          onClick={() => {
            let toggledDays = togglePeriod(data.getIn(['data', 'days']), List(Range(1, 8)));
            updateKeyValue(data.getIn(['data', 'id']), 'days', toggledDays);
          }}
        >Λ</Selector>
        {List(['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']).map((val, index, list) => {
          return (
            <Selector
              key={index}
              width='48px'
              square
              selected={data.getIn(['data', 'days']).includes(index + 1)}
              onClick={() => {
                let toggledDays = togglePeriod(data.getIn(['data', 'days']), index + 1);
                updateKeyValue(data.getIn(['data', 'id']), 'days', toggledDays);
              }}
            >{val}</Selector>
          );
        })}
      </FlexContainer>
      : data.getIn(['data', 'months']).size > 0
        ? <FlexContainer jc='space-between' wrap='true'>
          <Selector
            width='46px'
            margin='3px 0px 0px 0px'
            square
            selected={data.getIn(['data', 'days']).size === 31}
            onClick={() => {
              let toggledDays = togglePeriod(data.getIn(['data', 'days']), List(Range(1, 32)));
              updateKeyValue(data.getIn(['data', 'id']), 'days', toggledDays);
            }}
          >Λ</Selector>
          {List(Range(1, 32)).map((val, index) => {
            return (
              <Selector
                key={index}
                width='46px'
                margin='3px 0px 0px 0px'
                square
                selected={data.getIn(['data', 'days']).includes(val)}
                onClick={() => {
                  let toggledDays = togglePeriod(data.getIn(['data', 'days']), val);
                  updateKeyValue(data.getIn(['data', 'id']), 'days', toggledDays);
                }}
              >{val}</Selector>
            );
          })}
          <Selector width='46px' margin='3px 0px 0px 0px' square invisible></Selector>
          <Selector width='46px' margin='3px 0px 0px 0px' square invisible></Selector>
          <Selector width='46px' margin='3px 0px 0px 0px' square invisible></Selector>
          <Selector width='46px' margin='3px 0px 0px 0px' square invisible></Selector>
        </FlexContainer>
        : [<FlexContainer key='1' jc='space-around'>
          <Input
            type='date'
            width='35%'
            value={''}
            onChange={(e) => {
              let toggledDays = togglePeriod(data.getIn(['data', 'days']), moment(e.target.value).dayOfYear());
              updateKeyValue(data.getIn(['data', 'id']), 'days', toggledDays);
            }}
          ></Input>
          <Selector
            width='48px'
            square
            selected={
              data.getIn(['data', 'days']).size === 366 ||
              (data.getIn(['data', 'days']).size === 365 && !moment().subtract(DAY_CHANGE_HOUR, 'hours').isLeapYear())
            }
            onClick={() => {
              let toggledDays;
              if (moment().subtract(DAY_CHANGE_HOUR, 'hours').isLeapYear()) {
                toggledDays = togglePeriod(data.getIn(['data', 'days']), List(Range(1, 367)));
              } else {
                toggledDays = togglePeriod(data.getIn(['data', 'days']), List(Range(1, 366)));
              }
              updateKeyValue(data.getIn(['data', 'id']), 'days', toggledDays);
            }}
          >Λ</Selector>
        </FlexContainer>,
        <FlexContainer key='2' jc='space-between' wrap='true'>
          {data.getIn(['data', 'days']).map((val, index) => {
            return (
              <Selector
                key={index + 3}
                margin='12px 0px 0px 0px'
                selected
                onClick={() => {
                  let toggledDays = togglePeriod(data.getIn(['data', 'days']), val);
                  updateKeyValue(data.getIn(['data', 'id']), 'days', toggledDays);
                }}
              >{moment(val, 'DDD').format('MM-DD')}</Selector>
            );
          })}
          {List(Range(0, (6 - data.getIn(['data', 'days']).size % 6) % 6))
            .map((val, index) => <Selector key={index} margin='12px 0px 0px 0px' invisible>01-01</Selector>)}
        </FlexContainer>]
    }
  </Subsection>
);

const MultipleDateTimeSelector = ({data, updateKeyValue}) => (
  <Subsection>
    <FlexContainer jc='space-between'>
      <Input
        type='date'
        width='35%'
        value={data.getIn(['data', 'start'])}
        onChange={e => updateKeyValue(data.getIn(['data', 'id']), 'start', e.target.value)}
      >Startdatum</Input>
      <Input
        type='date'
        width='35%'
        value={data.getIn(['data', 'end'])}
        onChange={e => updateKeyValue(data.getIn(['data', 'id']), 'end', e.target.value)}
      >Enddatum</Input>
      <Input
        type='time'
        width='20%'
        value={data.getIn(['data', 'time'])}
        onChange={e => updateKeyValue(data.getIn(['data', 'id']), 'time', e.target.value)}
      >Uhrzeit</Input>
    </FlexContainer>
  </Subsection>
);

const DoneSelector = ({data, updateKeyValue}) => (
  <Subsection>
    <FlexContainer jc='left'>
      <Selector
        selected={data.getIn(['data', 'lastExec', 'done'])}
        onClick={() => {
          updateKeyValue(
            data.getIn(['data', 'id']),
            'lastExec',
            data.getIn(['data', 'lastExec']).set('done', !data.getIn(['data', 'lastExec', 'done']))
          );
        }}
      >{data.getIn(['data', 'lastExec', 'done']) ? 'Erledigt' : 'Nicht erledigt'}</Selector>
    </FlexContainer>
  </Subsection>
);

const SummInput = ({data, updateKeyValue}) => (
  <Subsection>
    <Input
      type='text'
      value={data.getIn(['data', 'summ'])}
      onChange={e => updateKeyValue(data.getIn(['data', 'id']), 'summ', e.target.value)}
    >Kurzbeschreibung</Input>
  </Subsection>
);

const DescInput = ({data, updateKeyValue}) => (
  <Subsection>
    <Input
      type='textarea'
      value={data.getIn(['data', 'desc'])}
      onChange={e => {
        updateKeyValue(data.getIn(['data', 'id']), 'desc', e.target.value);
        taresize(e.target);
      }}
      >Beschreibung</Input>
  </Subsection>
);

const FormButtons = ({data, save, discard, del}) => (
  <Subsection>
    <FlexContainer jc='space-evenly'>
      <TextButton
        onClick={() => save(data.getIn(['data', 'id']))}
      >Speichern</TextButton>
      <TextButton
        padding={8}
        onClick={() => discard(data.getIn(['data', 'id']))}
      >Abbrechen</TextButton>
      {data.getIn(['data', 'id']) === 'new'
        ? null
        : <TextButton
          padding={8}
          onClick={() => {
            if (window.confirm('Möchten Sie den Eintrag wirklich löschen?')) del(data.getIn(['data', 'id']));
          }}
        >Löschen</TextButton>
      }
    </FlexContainer>
  </Subsection>
);

const Form = ({type, newEntry, data, updateKeyValue, save, discard, del}) => (
  <Section>
    <Header>{getHeader(type, newEntry)}</Header>
    {type === 'rule'
      ? null
      : [
        <RegularitySelector key='1' data={data} updateKeyValue={updateKeyValue} />,
        data.getIn(['data', 'single'])
          ? <SingleDateTimeSelector key='2' data={data} updateKeyValue={updateKeyValue} />
          : [
            <MonthsSelector key='3' data={data} updateKeyValue={updateKeyValue} />,
            <WeeksSelector key='4' data={data} updateKeyValue={updateKeyValue} />,
            <DaysSelector key='5' data={data} updateKeyValue={updateKeyValue} />,
            <MultipleDateTimeSelector key='6' data={data} updateKeyValue={updateKeyValue} />
          ],
        type === 'task'
          ? <DoneSelector key='7' data={data} updateKeyValue={updateKeyValue} />
          : null
      ]
    }
    
    <SummInput data={data} updateKeyValue={updateKeyValue} />
    <DescInput data={data} updateKeyValue={updateKeyValue} />
    <FormButtons data={data} save={save} discard={discard} del={del} />
  </Section>
);

export default Form;