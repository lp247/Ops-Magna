import React from 'react';
import autosize from 'autosize';
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

// class Form extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     single: this.props.data.single === undefined ? true : this.props.data.single,
  //     _id: this.props.data._id || moment().format(),
  //     _rev: this.props.data._rev || '',
  //     summ: this.props.data.summ || '',
  //     desc: this.props.data.desc || '',
  //     r_months: this.props.data.r_months || List(),
  //     r_weeks: this.props.data.r_weeks || List(),
  //     r_days: this.props.data.r_days || List(),
  //     r_time: this.props.data.r_time || '',
  //     r_start: this.props.data.r_start || '',
  //     r_end: this.props.data.r_end || ''
  //   };

  //   this.inputsOK = this.inputsOK.bind(this);
  //   this.pack = this.pack.bind(this);
  //   this.toggleRAV = this.toggleRAV.bind(this);
  //   this.createMonthFilter = this.createMonthFilter.bind(this);
  //   this.createWeekFilter = this.createWeekFilter.bind(this);
  //   this.createDayFilter = this.createDayFilter.bind(this);
  // }

  // inputsOK() {
  //   if (!this.state.single) {
  //     if (this.state.r_months.length === 0 && this.state.r_weeks.length === 0) {
  //       alert('Wählen Sie entweder mindestens einen Monat oder mindestens eine Woche aus!');
  //       return false;
  //     }
  //     if (this.state.r_days.length === 0) {
  //       alert('Wählen Sie mindestens einen Tag aus!');
  //       return false;
  //     }
  //     if (this.state.r_start > this.state.r_end) {
  //       alert('Das Startdatum liegt hinter dem Enddatum!');
  //       return false;
  //     }
  //   } else {
  //     if (!this.state.r_start) {
  //       alert('Geben Sie ein Datum an!');
  //       return false;
  //     }
  //   }
  //   if (!this.state.summ) {
  //     alert('Geben Sie eine Beschreibung an!');
  //     return false;
  //   }
  //   return true;
  // }

  // pack() {
  //   return {
  //     single: this.state.single,
  //     _id: this.state._id,
  //     _rev: this.state._rev,
  //     type: this.props.type,
  //     summ: this.state.summ,
  //     desc: this.state.desc,
  //     r_months: this.state.r_months,
  //     r_weeks: this.state.r_weeks,
  //     r_days: this.state.r_days,
  //     r_time: this.state.r_time,
  //     r_start: this.state.r_start || '2000-01-01',
  //     r_end: this.state.r_end || '2999-12-31'
  //   };
  // }

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

// const toggleAV = (arr, value) => {
//   // let tmp = this.state[arr];

//   if (arr.includes(value)) {
//     let index = arr.findIndex(v => v === value);
//     return arr.delete(index);
//   } else {
//     return arr.push(value);
//   }
// }
  
  // if (arr === 'r_months' && this.state[arr].length === 0) {
  //   this.setState({r_weeks: this.state.r_weeks.clear(), r_days: this.state.r_days.clear()});
  // }
  // if (arr === 'r_weeks' && this.state[arr].length === 0) {
  //   this.setState({r_days: this.state.r_days.clear()});
  // }

// const toggleAll = (list, fulllist) => {
//   if (list.size === fulllist.size) {
//     return List();
//   } else {
//     return fulllist;
//   }
// }
    
  //   var newarr;
  //   if (value === 'all') {
  //     if (arr === 'r_months') {
  //       if (this.state[arr].length === 12) {
  //         newarr = List();
  //       } else {
  //         newarr = List(Range(0, 12));
  //       }
  //     } else if (arr === 'r_weeks') {
  //       if (this.state.r_months.length === 0) {
  //         if (this.state[arr].length === 52) {
  //           newarr = List();
  //         } else {
  //           newarr = List(Range(1, 53));
  //         }
  //       } else {
  //         if (this.state[arr].length === 5) {
  //           newarr = List();
  //         } else {
  //           newarr = List(Range(1, 6));
  //         }
  //       }
  //     } else {
  //       if (this.state.r_weeks.length === 0) {
  //         if (this.state.r_months.length === 0) {
  //           if (this.state[arr].length === 366) {
  //             newarr = List();
  //           } else {
  //             newarr = List(Range(1, 367));
  //           }
  //         } else {
  //           if (this.state[arr].length === 31) {
  //             newarr = List();
  //           } else {
  //             newarr = List(Range(1, 32));
  //           }
  //         }
  //       } else {
  //         if (this.state[arr].length === 7) {
  //           newarr = List();
  //         } else {
  //           newarr = List(Range(1, 8));
  //         }
  //       }
  //     }
  //   } else {
  //     let index = this.state[arr].findIndex(v => v === value);
  //     if (index > -1) {
  //       newarr = this.state[arr].delete(index);
  //     } else {
  //       newarr = this.state[arr].push(value);
  //     }
  //   }

  //   if (arr === 'r_months' && this.state[arr].length === 0) {
  //     this.setState({r_weeks: this.state.r_weeks.clear(), r_days: this.state.r_days.clear()});
  //   }
  //   if (arr === 'r_weeks' && this.state[arr].length === 0) {
  //     this.setState({r_days: this.state.r_days.clear()});
  //   }

  //   this.setState({[arr]: newarr});
  // }
  
// const MonthFilter = () => {
//     let arr1 = ['J', 'F', 'M', 'A', 'M', 'J'];
//     let arr2 = ['J', 'A', 'S', 'O', 'N', 'D'];
//     return [
//       <FlexContainer jc='space-between' key='1'>
//         <Selector
//           width='48px'
//           square
//           selected={this.state.r_months.length === 12}
//           onClick={() => this.toggleRAV('r_months', 'all')}
//         >Λ</Selector>
//         {arr1.map((val, index) => {
//           return (
//             <Selector
//               key={index}
//               width='48px'
//               square
//               selected={this.state.r_months.findIndex(v => v === index) > -1}
//               onClick={() => this.toggleRAV('r_months', index)}
//             >{val}</Selector>
//           );
//         })}
//       </FlexContainer>,
//       <FlexContainer jc='space-between' key='2'>
//         <Selector width='48px' square invisible></Selector>
//         {arr2.map((val, index) => {
//           return (
//             <Selector
//               key={index}
//               width='48px'
//               square
//               selected={this.state.r_months.findIndex(v => v === (index + 6)) > -1}
//               onClick={() => this.toggleRAV('r_months', index + 6)}
//             >{val}</Selector>
//           );
//         })}
//       </FlexContainer>
//     ];
//   }

// const WeekFilter = ({period}) => {
    // if (period === 'year') {
    //   let arr = [...Array(53).keys()];
    //   arr.shift();
    //   return (
    //     <FlexContainer jc='space-between' wrap='true'>
    //       <Selector
    //         width='48px'
    //         square
    //         selected={this.state.r_weeks.length === 52}
    //         onClick={() => this.toggleRAV('r_weeks', 'all')}
    //       >Λ</Selector>
    //       {arr.map((val, index) => {
    //         return (
    //           <Selector
    //             key={index}
    //             width='48px'
    //             square
    //             selected={this.state.r_weeks.findIndex(v => v === val) > -1}
    //             onClick={() => this.toggleRAV('r_weeks', val)}
    //           >w{val}</Selector>
    //         );
    //       })}
    //       <Selector width='48px' square invisible></Selector>
    //     </FlexContainer>
    //   );
    // }
    // if (period === 'month') {
    //   let arr = [1,2,3,4,5];
    //   return (
    //     <FlexContainer jc='space-between' wrap='true'>
    //       <Selector
    //         width='48px'
    //         square
    //         selected={this.state.r_weeks.length === 5}
    //         onClick={() => this.toggleRAV('r_weeks', 'all')}
    //       >Λ</Selector>
    //       {arr.map((val, index) => {
    //         return (
    //           <Selector
    //             key={index}
    //             width='48px'
    //             square
    //             selected={this.state.r_weeks.findIndex(v => v === val) > -1}
    //             onClick={() => this.toggleRAV('r_weeks', val)}
    //           >{val}.</Selector>
    //         );
    //       })}
    //     </FlexContainer>
    //   );
    // }
  // }
  
// const DayFilter = ({period, days}) => {
    // if (period === 'week') {
    //   let arr = List(['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']);
    //   return (
    //     <FlexContainer jc='space-between'>
    //       <Selector
    //         width='48px'
    //         square
    //         selected={days.size === 7}
    //         onClick={() => this.toggleRAV('r_days', 'all')}
    //       >Λ</Selector>
    //       {arr.map((val, index) => {
    //         return (
    //           <Selector
    //             key={index}
    //             width='48px'
    //             square
    //             selected={days.findIndex(v => v === (index + 1)) > -1}
    //             onClick={() => this.toggleRAV('r_days', index + 1)}
    //           >{val}</Selector>
    //         );
    //       })}
    //     </FlexContainer>
    //   );
    // }
    // if (period === 'month') {
    //   let arr = List(Range(1, 32));
    //   return (
    //     <FlexContainer jc='space-between' wrap='true'>
    //       <Selector
    //         width='48px'
    //         square
    //         selected={days.size === 31}
    //         onClick={() => this.toggleRAV('r_days', 'all')}
    //       >Λ</Selector>
    //       {arr.map((val, index) => {
    //         return (
    //           <Selector
    //             key={index}
    //             width='48px'
    //             square
    //             selected={days.has(val)}
    //             onClick={() => this.toggleRAV('r_days', val)}
    //           >{val}</Selector>
    //         );
    //       })}
    //       <Selector width='48px' square invisible></Selector>
    //       <Selector width='48px' square invisible></Selector>
    //       <Selector width='48px' square invisible></Selector>
    //       <Selector width='48px' square invisible></Selector>
    //     </FlexContainer>
    //   );
    // }
    // if (period === 'year') return null;
  // }

  // render() {
const Form = ({header, data, updateKeyValue, save, discard, del}) => (
    // let header;
    // if (this.props.mode === 'new' && this.props.type === 'task') header = 'Neue Aufgabe';
    // if (this.props.mode === 'new' && this.props.type === 'event') header = 'Neuer Termin';
    // if (this.props.mode === 'edit' && this.props.type === 'task') header = 'Aufgabe bearbeiten';
    // if (this.props.mode === 'edit' && this.props.type === 'event') header = 'Termin bearbeiten';
  // <Page>
  //   <ContentWrapper>
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
              autosize(e.target);
              updateKeyValue(data.get('data').get('id'), 'desc', e.target.value);
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
  //   </ContentWrapper>
  // </Page>
);
// }

export default Form;