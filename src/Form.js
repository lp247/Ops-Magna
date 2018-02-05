import React, {Component} from 'react';
import moment from 'moment';

import {
  Page, ContentWrapper, Header, Input, TextButton, FlexContainer, Selector, Section, Subsection, OButton
} from './components.js';

class Form extends Component {
  constructor(props) {
    super(props);
    let [wd, oc, st, os] = (this.props.data.rid || '0-0-0-0').split('-').map(n => parseInt(n, 10));
    this.state = {
      _id: this.props.data._id || moment().format(),
      _rev: this.props.data._rev || '',
      summ: this.props.data.summ || '',
      desc: this.props.data.desc || '',
      wd: wd,
      oc: oc,
      st: st,
      os: os,
      sd: this.props.data.sd || '',
      ed: this.props.data.ed || '',
      time: this.props.data.time || '',
      quantitySelector: 0,
      periodSelector: 0,
      wdS: 0,
      ocS: 0
    };

    this.getObj = this.getObj.bind(this);
    this.toggleWDSelector = this.toggleWDSelector.bind(this);
    this.createOCTable = this.createOCTable.bind(this);
    this.createWDList = this.createWDList.bind(this);
  }

  getObj() {
    return {
      _id: this.state._id,
      _rev: this.state._rev,
      type: this.props.type,
      summ: this.state.summ,
      desc: this.state.desc,
      rid: [this.state.wd, this.state.oc, this.state.st, this.state.os].join('-'),
      sd: this.state.sd,
      ed: this.state.ed,
      time: this.state.time
    };
  }

  toggleWDSelector(index) {
    let tmp = this.state.wdS;
    tmp[index] = !tmp[index];
    this.setState({wdS: tmp});
  }

  createOCTable() {
    let tcells = [...Array(32).keys()];
    tcells.shift();
    return (
      <FlexContainer jc='space-between' wrap>
        {tcells.map((val, index) => {
          return (
            <Selector key={index} width='32px' square selected={this.state.ocS === val} onClick={() => {this.setState({ocS: val})}}>{val}.</Selector>
          );
        })}
        <Selector width='32px' square invisible></Selector>
        <Selector width='32px' square invisible></Selector>
        <Selector width='32px' square invisible></Selector>
        <Selector width='32px' square invisible></Selector>
        <Selector width='32px' square invisible></Selector>
      </FlexContainer>
    );
  }

  createWDList(includeDAY) {
    let arr = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
    if (includeDAY) arr.unshift('Tag');
    return (
      <FlexContainer jc='space-between'>
        {arr.map((val, index) => {
          return (
            <Selector key={index} width='32px' square selected={this.state.wdS === index} onClick={() => this.setState({wdS: index})}>{val}</Selector>
          );
        })}
      </FlexContainer>
    );
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
                <Selector
                  selected={this.state.quantitySelector === 0}
                  onClick={() => {this.setState({quantitySelector: 0})}}
                >Einmalig</Selector>
                <Selector
                  selected={this.state.quantitySelector === 1}
                  onClick={() => {this.setState({quantitySelector: 1})}}
                >Regelmäßig</Selector>
              </FlexContainer>
            </Subsection>
              {this.state.quantitySelector === 1
                ? <Subsection>
                  <FlexContainer jc='space-evenly'>
                    <Selector
                      selected={this.state.periodSelector === 0}
                      onClick={() => {this.setState({periodSelector: 0})}}
                    >Täglich</Selector>
                    <Selector
                      selected={this.state.periodSelector === 1}
                      onClick={() => {this.setState({periodSelector: 1})}}
                    >Wöchentlich</Selector>
                    <Selector
                      selected={this.state.periodSelector === 2}
                      onClick={() => {this.setState({periodSelector: 2})}}
                    >Monatlich</Selector>
                  </FlexContainer>
                </Subsection>
                : null
              }
              {this.state.quantitySelector === 0
                ? <Subsection><Input type='date' value={this.state.sd} onChange={e => this.setState({sd: e.target.value})}>Datum</Input></Subsection>
                : null
              }
              {this.state.quantitySelector === 1 && this.state.periodSelector === 1
                ? <Subsection>
                  {this.createWDList(false)}
                </Subsection>
                : null
              }
              {this.state.quantitySelector === 1 && this.state.periodSelector === 2
                ? <Subsection>
                  {this.createOCTable()}
                </Subsection>
                : null
              }
              {this.state.quantitySelector === 1 && this.state.periodSelector === 2
                ? <Subsection>
                  {this.createWDList(true)}
                </Subsection>
                : null
              }
              {this.state.quantitySelector === 1
                ? <Subsection>
                  <FlexContainer jc='space-between'>
                    <OButton size='72px'></OButton>
                    <OButton size='40px'></OButton>
                    <OButton size='40px' checked></OButton>
                    <OButton size='40px'></OButton>
                    <OButton size='40px'></OButton>
                  </FlexContainer>
                  <FlexContainer jc='space-between'>
                    <Input type='date' width='20%' value={this.state.sd} onChange={e => this.setState({sd: e.target.value})}>Startdatum</Input>
                    <Input type='date' width='20%' value={this.state.ed} onChange={e => this.setState({ed: e.target.value})}>Enddatum</Input>
                    <Input type='number' width='20%' value={this.state.st} onChange={e => this.setState({st: e.target.value})}>Schrittweite</Input>
                    <Input type='number' width='20%' value={this.state.os} onChange={e => this.setState({os: e.target.value})}>Versatz</Input>
                  </FlexContainer>
                </Subsection>
                : null
              }
              <Subsection>
                <Input type='text' value={this.state.summ} onChange={e => this.setState({summ: e.target.value})}>Kurzbeschreibung</Input>
                <Input type='textarea' height='128px' value={this.state.desc} onChange={e => this.setState({desc: e.target.value})}>Beschreibung</Input>
              </Subsection>
              <Subsection>
                <FlexContainer jc='space-evenly'>
                  <TextButton onClick={() => {this.props.save(this.getObj());}}>Speichern</TextButton>
                  <TextButton padding={8} onClick={this.props.discard}>Abbrechen</TextButton>
                  {this.props.mode === 'edit' ? <TextButton padding={8} onClick={() => {this.props.delete(this.getObj());}}>Löschen</TextButton> : null}
                </FlexContainer>
              </Subsection>
            </Section>
        </ContentWrapper>
      </Page>
    );
  }
}

export default Form;