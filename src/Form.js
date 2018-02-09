import React, {Component} from 'react';
import moment from 'moment';

import {
  Page, ContentWrapper, Header, Input, TextButton, FlexContainer, Selector, Section, Subsection
} from './components.js';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      single: true,
      _id: this.props.data._id || moment().format(),
      _rev: this.props.data._rev || '',
      summ: this.props.data.summ || '',
      desc: this.props.data.desc || '',
      r_months: this.props.data.r_months || [],
      r_weeks: this.props.data.r_weeks || [],
      r_days: this.props.data.r_days || [],
      r_time: this.props.data.r_time || '',
      r_start: this.props.data.r_start || '',
      r_end: this.props.data.r_end || ''
    };

    this.inputsOK = this.inputsOK.bind(this);
    this.pack = this.pack.bind(this);
    this.toggleRAV = this.toggleRAV.bind(this);
    this.createMonthFilter = this.createMonthFilter.bind(this);
    this.createWeekFilter = this.createWeekFilter.bind(this);
    this.createDayFilter = this.createDayFilter.bind(this);
  }

  inputsOK() {
    if (!this.state.single) {
      if (this.state.r_months.length === 0 && this.state.r_weeks.length === 0) {
        alert('Wählen Sie entweder mindestens einen Monat oder mindestens eine Woche aus!');
        return false;
      }
      if (this.state.r_days.length === 0) {
        alert('Wählen Sie mindestens einen Tag aus!');
        return false;
      }
      if (this.state.r_start > this.state.r_end) {
        alert('Das Startdatum liegt hinter dem Enddatum!');
        return false;
      }
    } else {
      if (!this.state.r_start) {
        alert('Geben Sie ein Datum an!');
        return false;
      }
    }
    if (!this.state.summ) {
      alert('Geben Sie eine Beschreibung an!');
      return false;
    }
    return true;
  }

  pack() {
    return {
      single: this.state.single,
      _id: this.state._id,
      _rev: this.state._rev,
      type: this.props.type,
      summ: this.state.summ,
      desc: this.state.desc,
      r_months: this.state.r_months,
      r_weeks: this.state.r_weeks,
      r_days: this.state.r_days,
      r_time: this.state.r_time,
      r_start: this.state.r_start || '2000-01-01',
      r_end: this.state.r_end || '2999-12-31'
    };
  }

  toggleRAV(arr, value) {
    let tmp = this.state[arr];
    
    if (arr === 'r_months' && tmp.length === 0) {
      this.setState({r_weeks: [], r_days: []});
    }
    if (arr === 'r_weeks' && tmp.length === 0) {
      this.setState({r_days: []});
    }
    
    if (value === 'all') {
      if (arr === 'r_months') {
        if (tmp.length === 12) {
          tmp = [];
        } else {
          tmp = [0,1,2,3,4,5,6,7,8,9,10,11];
        }
      } else if (arr === 'r_weeks') {
        if (this.state.r_months.length === 0) {
          if (tmp.length === 52) {
            tmp = [];
          } else {
            tmp = [...Array(53).keys()];
            tmp.shift();
          }
        } else {
          if (tmp.length === 5) {
            tmp = [];
          } else {
            tmp = [1,2,3,4,5];
          }
        }
      } else {
        if (this.state.r_weeks.length === 0) {
          if (this.state.r_months.length === 0) {
            if (tmp.length === 366) {
              tmp = [];
            } else {
              tmp = [...Array(367).keys()];
              tmp.shift();
            }
          } else {
            if (tmp.length === 31) {
              tmp = [];
            } else {
              tmp = [...Array(32).keys()];
              tmp.shift();
            }
          }
        } else {
          if (tmp.length === 7) {
            tmp = [];
          } else {
            tmp = [1,2,3,4,5,6,7];
          }
        }
      }
    } else {
      let index = tmp.findIndex(v => v === value);
      if (index > -1) {
        tmp.splice(index, 1);
      } else {
        tmp.push(value);
      }
    }


    if (arr === 'r_months' && tmp.length === 0) {
      this.setState({r_weeks: [], r_days: []});
    }
    if (arr === 'r_weeks' && tmp.length === 0) {
      this.setState({r_days: []});
    }

    this.setState({[arr]: tmp});
  }
  
  createMonthFilter() {
    let arr1 = ['J', 'F', 'M', 'A', 'M', 'J'];
    let arr2 = ['J', 'A', 'S', 'O', 'N', 'D'];
    return [
      <FlexContainer jc='space-between' key='1'>
        <Selector
          width='48px'
          square
          selected={this.state.r_months.length === 12}
          onClick={() => this.toggleRAV('r_months', 'all')}
        >Λ</Selector>
        {arr1.map((val, index) => {
          return (
            <Selector
              key={index}
              width='48px'
              square
              selected={this.state.r_months.findIndex(v => v === index) > -1}
              onClick={() => this.toggleRAV('r_months', index)}
            >{val}</Selector>
          );
        })}
      </FlexContainer>,
      <FlexContainer jc='space-between' key='2'>
        <Selector width='48px' square invisible></Selector>
        {arr2.map((val, index) => {
          return (
            <Selector
              key={index}
              width='48px'
              square
              selected={this.state.r_months.findIndex(v => v === (index + 6)) > -1}
              onClick={() => this.toggleRAV('r_months', index + 6)}
            >{val}</Selector>
          );
        })}
      </FlexContainer>
    ];
  }

  createWeekFilter(period) {
    if (period === 'year') {
      let arr = [...Array(53).keys()];
      arr.shift();
      return (
        <FlexContainer jc='space-between' wrap='true'>
          <Selector
            width='48px'
            square
            selected={this.state.r_weeks.length === 52}
            onClick={() => this.toggleRAV('r_weeks', 'all')}
          >Λ</Selector>
          {arr.map((val, index) => {
            return (
              <Selector
                key={index}
                width='48px'
                square
                selected={this.state.r_weeks.findIndex(v => v === val) > -1}
                onClick={() => this.toggleRAV('r_weeks', val)}
              >{val}.</Selector>
            );
          })}
          <Selector width='48px' square invisible></Selector>
        </FlexContainer>
      );
    }
    if (period === 'month') {
      let arr = [1,2,3,4,5];
      return (
        <FlexContainer jc='space-between' wrap='true'>
          <Selector
            width='48px'
            square
            selected={this.state.r_weeks.length === 5}
            onClick={() => this.toggleRAV('r_weeks', 'all')}
          >Λ</Selector>
          {arr.map((val, index) => {
            return (
              <Selector
                key={index}
                width='48px'
                square
                selected={this.state.r_weeks.findIndex(v => v === val) > -1}
                onClick={() => this.toggleRAV('r_weeks', val)}
              >{val}.</Selector>
            );
          })}
        </FlexContainer>
      );
    }
  }
  
  createDayFilter(period) {
    if (period === 'week') {
      let arr = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
      return (
        <FlexContainer jc='space-between'>
          <Selector
            width='48px'
            square
            selected={this.state.r_days.length === 7}
            onClick={() => this.toggleRAV('r_days', 'all')}
          >Λ</Selector>
          {arr.map((val, index) => {
            return (
              <Selector
                key={index}
                width='48px'
                square
                selected={this.state.r_days.findIndex(v => v === (index + 1)) > -1}
                onClick={() => this.toggleRAV('r_days', index + 1)}
              >{val}</Selector>
            );
          })}
        </FlexContainer>
      );
    }
    if (period === 'month') {
      let arr = [...Array(32).keys()];
      arr.shift();
      return (
        <FlexContainer jc='space-between' wrap='true'>
          <Selector
            width='48px'
            square
            selected={this.state.r_days.length === 31}
            onClick={() => this.toggleRAV('r_days', 'all')}
          >Λ</Selector>
          {arr.map((val, index) => {
            return (
              <Selector
                key={index}
                width='48px'
                square
                selected={this.state.r_days.findIndex(v => v === val) > -1}
                onClick={() => this.toggleRAV('r_days', val)}
              >{val}</Selector>
            );
          })}
          <Selector width='48px' square invisible></Selector>
          <Selector width='48px' square invisible></Selector>
          <Selector width='48px' square invisible></Selector>
          <Selector width='48px' square invisible></Selector>
        </FlexContainer>
      );
    }
    if (period === 'year') return null;
  }

  render() {
    let header;
    if (this.props.mode === 'new' && this.props.type === 'task') header = 'Neue Aufgabe';
    if (this.props.mode === 'new' && this.props.type === 'event') header = 'Neuer Termin';
    if (this.props.mode === 'edit' && this.props.type === 'task') header = 'Aufgabe bearbeiten';
    if (this.props.mode === 'edit' && this.props.type === 'event') header = 'Termin bearbeiten';
    return (
      <Page>
        <ContentWrapper>
          <Section>
            <Header>{header}</Header>
            <Subsection>
              <FlexContainer jc='space-evenly'>
                <Selector selected={this.state.single} onClick={() => this.setState({single: true})}>Einmalig</Selector>
                <Selector selected={!this.state.single} onClick={() => this.setState({single: false})}>Regelmäßig</Selector>
              </FlexContainer>
            </Subsection>
            {this.state.single
              ? <Subsection>
                <FlexContainer jc='space-between'>
                  <Input type='date' width='60%' value={this.state.r_start} onChange={e => this.setState({r_start: e.target.value})}>Datum</Input>
                  <Input type='time' width='30%' value={this.state.r_time} onChange={e => this.setState({r_time: e.target.value})}>Uhrzeit</Input>
                </FlexContainer>
              </Subsection>
              : [
                <Subsection key='1'>
                  {this.createMonthFilter()}
                </Subsection>,
                <Subsection key='2'>
                  {this.createWeekFilter(this.state.r_months.length === 0 ? 'year' : 'month')}
                </Subsection>,
                <Subsection key='3'>
                  {this.createDayFilter(this.state.r_weeks.length === 0 ? (this.state.r_months.length === 0 ? 'year' : 'month') : 'week')}
                </Subsection>,
                <Subsection key='4'>
                  <FlexContainer jc='space-between'>
                    <Input type='date' width='35%' value={this.state.r_start} onChange={e => this.setState({r_start: e.target.value})}>Startdatum</Input>
                    <Input type='date' width='35%' value={this.state.r_end} onChange={e => this.setState({r_end: e.target.value})}>Enddatum</Input>
                    <Input type='time' width='20%' value={this.state.r_time} onChange={e => this.setState({r_time: e.target.value})}>Uhrzeit</Input>
                  </FlexContainer>
                </Subsection>
              ]
            }
            <Subsection>
              <Input type='text' value={this.state.summ} onChange={e => this.setState({summ: e.target.value})}>Kurzbeschreibung</Input>
              <Input type='textarea' height='128px' value={this.state.desc} onChange={e => this.setState({desc: e.target.value})}>Beschreibung</Input>
            </Subsection>
            <Subsection>
              <FlexContainer jc='space-evenly'>
                <TextButton onClick={() => {if (this.inputsOK()) this.props.save(this.pack());}}>Speichern</TextButton>
                <TextButton padding={8} onClick={this.props.discard}>Abbrechen</TextButton>
                {this.props.mode === 'edit'
                  ? <TextButton
                    padding={8}
                    onClick={() => {if (window.confirm('Möchten Sie den Eintrag wirklich löschen?')) this.props.delete(this.pack());}}
                  >Löschen</TextButton>
                  : null
                }
              </FlexContainer>
            </Subsection>
          </Section>
        </ContentWrapper>
      </Page>
    );
  }
}

export default Form;