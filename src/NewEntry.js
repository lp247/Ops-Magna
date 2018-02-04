import React, {Component} from 'react';
import moment from 'moment';

import {
  Page, ContentWrapper, Section, Header, Inputfield, Inputlabel, Input, Textarea, TextButton
} from './components.js';

class NewEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.data._id || moment().format(),
      _rev: this.props.data._rev || '',
      summ: this.props.data.summ || '',
      desc: this.props.data.desc || '',
      rid: this.props.data.rid || '',
      sd: this.props.data.sd || '',
      ed: this.props.data.ed || '',
      time: this.props.data.time || ''
    };

    this.getObj = this.getObj.bind(this);
  }

  getObj() {
    return {
      _id: this.state._id,
      _rev: this.state._rev,
      type: this.props.type,
      summ: this.state.summ,
      desc: this.state.desc,
      rid: this.state.rid,
      sd: this.state.sd,
      ed: this.state.ed,
      time: this.state.time
    };
  }

  render() {
    return (
      <Page>
        <ContentWrapper>
          <Section>
            <Header>{this.props.type === 'task' ? 'Neue Aufgabe' : 'Neuer Termin'}</Header>
            <Inputfield>
              <Inputlabel htmlFor="date">Startdatum:</Inputlabel>
              <Input
                type="date"
                id="startdate"
                value={this.state.sd}
                onChange={e => {this.setState({sd: e.target.value});}}
              />
            </Inputfield>
            <Inputfield>
              <Inputlabel htmlFor="date">Enddatum:</Inputlabel>
              <Input
                type="date"
                id="enddate"
                value={this.state.ed}
                onChange={e => {this.setState({ed: e.target.value});}}
              />
            </Inputfield>
            <Inputfield>
              <Inputlabel htmlFor="time">Uhrzeit:</Inputlabel>
              <Input
                type="time"
                id="time"
                value={this.state.time}
                onChange={e => {this.setState({time: e.target.value});}}
              />
            </Inputfield>
            <Inputfield>
              <Inputlabel htmlFor="rid">Wiederholkennung:</Inputlabel>
              <Input
                type="text"
                id="rid"
                value={this.state.rid}
                onChange={e => {this.setState({rid: e.target.value});}}
              />
            </Inputfield>
            <Inputfield>
              <Inputlabel htmlFor="summ">Kurzbeschreibung:</Inputlabel>
              <Input
                type="text"
                id="summ"
                value={this.state.summ}
                onChange={e => {this.setState({summ: e.target.value});}}
              />
            </Inputfield>
            <Inputfield>
              <Inputlabel htmlFor="text">Beschreibung:</Inputlabel>
              <Textarea
                id="text"
                value={this.state.desc}
                onChange={e => {this.setState({desc: e.target.value});}}
              />
            </Inputfield>
            <Inputfield>
              <TextButton onClick={() => {this.props.save(this.getObj());}}>Speichern</TextButton>
              <TextButton padding={8} onClick={this.props.discard}>Abbrechen</TextButton>
              <TextButton padding={8} onClick={() => {this.props.delete(this.getObj());}}>Löschen</TextButton>
            </Inputfield>
          </Section>
        </ContentWrapper>
      </Page>
    );
  }
}

export default NewEntry;