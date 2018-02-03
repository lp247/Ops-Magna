import React, {Component} from 'react';
import styled from 'styled-components';
import PouchDB from 'pouchdb';
import moment from 'moment';

const ContentWrapper = styled.div`
  @media (min-width: 501px) {
    width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 500px) {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
  box-sizing: border-box;
  border: 1px solid black;
  padding: 12px;
`;

const Section = styled.div`
  margin-top: 48px;
  border: 1px solid black;
`;

const PaleSection = Section.extend`
  color: rgb(201, 201, 201);
`;

const Header = styled.p`
  font-size: 36px;
  margin-bottom: 16px;
`;

const List = styled.ul`
  list-style-type: none;
`;

const Listelement = styled.li`
  margin-top: 8px;
`;

const Checkbox = styled.input`
  float: left;
  margin-top: 7px;
`;

const Description = styled.span`
  display: block;
  margin-left: 32px;
`;

const Infotext = styled.p`
`;

const Successtext = Infotext.extend`
  color: forestgreen;
`;

const Inputfield = styled.div`
  margin-top: 16px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 128px;
`;

const Inputlabel = styled.label`
  display: block;
`;

const Button = styled.button`
  margin-right: 16px;
`;

// const HOST = '192.168.0.110:8000';
// const tdf = new Intl.NumberFormat(undefined, {minimumIntegerDigits: 2});

function match(now, rid, startdate, enddate) {
  if (!moment.isMoment(now)) now = moment(now);
  if (!moment.isMoment(startdate)) startdate = moment(startdate);
  if (!moment.isMoment(enddate)) enddate = moment(enddate);
  if (!rid) return false;
  var iwd = now.isoWeekday();
  var dom = now.date();
  var [rid_wd, rid_oc, rid_st, rid_os] = rid.split('-').map(n => parseInt(n, 10));
  if (
    now.isBetween(startdate, enddate, 'day', '[]') &&
    (
      (rid_wd === 0   && rid_oc === 0                  && rid_st  >  0 && (now.diff(startdate, 'days')   % rid_st - rid_os) === 0) ||
      (rid_wd === 0   && rid_oc === dom                && rid_st  >  0 && (now.diff(startdate, 'months') % rid_st - rid_os) === 0) ||
      (rid_wd === iwd && rid_oc === 0                  && rid_st  >  0 && (now.diff(startdate, 'weeks')  % rid_st - rid_os) === 0) ||
      (rid_wd === iwd && rid_oc === Math.ceil(dom / 7) && rid_st  >  0 && (now.diff(startdate, 'months') % rid_st - rid_os) === 0) ||
      (rid_wd === 0   && rid_oc === 0                  && rid_st === 0 && now.isSame(startdate, 'day')) ||
      (rid_wd === 0   && rid_oc === dom                && rid_st === 0 && now.isSame(startdate, 'day')) ||
      (rid_wd === iwd && rid_oc === 0                  && rid_st === 0 && now.isSame(startdate, 'day')) ||
      (rid_wd === iwd && rid_oc === Math.ceil(dom / 7) && rid_st === 0 && now.isSame(startdate, 'day'))
    )
  ) return true;
  return false;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskArr: [],
      appointmentArr: [],
      _id: '',
      type: '',
      desc: '',
      g: '',
      done: false,
      rid: '',
      sd: '',
      ed: '',
      time: ''
    };

    this.localDB = new PouchDB('todos');
    this.remoteDB = new PouchDB('http://192.168.0.111:5984/todos');

    this.localDB.changes({
      since: 'now',
      live: true
    }).on('change', this.readDB.bind(this));

    this.localDB.sync(this.remoteDB, {
      live: true,
      retry: true
    }).on('change', function (change) {
      // yo, something changed!
    }).on('paused', function (info) {
      // replication was paused, usually because of a lost connection
    }).on('active', function (info) {
      // replication was resumed
    }).on('error', function (err) {
      // totally unhandled error (shouldn't happen)
    });

    this.readDB = this.readDB.bind(this);
    this.writeDB = this.writeDB.bind(this);
  }

  componentDidMount() {
    this.readDB();
  }

  readDB() {
    this.localDB.allDocs({include_docs: true}).then((result) => {
      this.setState({
        taskArr: result.rows.filter(element => element.doc.type === 't'),
        appointmentArr: result.rows.filter(element => element.doc.type === 'a')
      });
    }).catch((err) => {
      throw err;
    });
  }

  writeDB(dataObject) {
    this.localDB.put(dataObject).then(result => {

    }).catch(err => {
      throw err;
    });
  }

  render() {
    var tasksOfToday = this.state.taskArr.filter(el => match(moment(), el.doc.rid, el.doc.sd, el.doc.ed));
    var appointmentsOfToday = this.state.appointmentArr.filter(el => match(moment(), el.doc.rid, el.doc.sd, el.doc.ed));
    if (this.state.type) {
      return (
        <ContentWrapper>
          <Section>
            <Header>{this.state.type === 't' ? 'Neue Aufgabe' : 'Neuer Termin'}</Header>
            {/* <div>
              <select
                value={this.state.type}
                onChange={e => {this.setState({type: e.target.value});}}
              >
                <option value="t">Aufgabe</option>
                <option value="a">Termin</option>
              </select>
            </div> */}
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
              <Inputlabel htmlFor="text">Text:</Inputlabel>
              <Textarea
                id="text"
                value={this.state.desc}
                onChange={e => {this.setState({desc: e.target.value});}}
              />
            </Inputfield>
            <Inputfield>
              <Button
                onClick={() => {
                  this.writeDB({
                    _id: this.state._id || moment().format(),
                    type: this.state.type,
                    desc: this.state.desc,
                    done: this.state.done,
                    rid: this.state.rid,
                    sd: this.state.sd,
                    ed: this.state.ed,
                    time: this.state.time
                  });
                  this.setState({type: ''});
                }}
              >Eintragen</Button>
              <Button
                onClick={() => {
                  this.setState({type: ''});
                }}
              >
                Abbrechen
              </Button>
            </Inputfield>
          </Section>
        </ContentWrapper>
      );
    }
    return (
      <ContentWrapper>
        <Section>
          <Header onClick={() => {this.setState({type: 't'});}}>Aufgaben +</Header>
          {tasksOfToday.length === 0
            ? <Infotext>Heute keine Aufgaben!</Infotext>
            : <List>
              {tasksOfToday.map((el, index) => {
                return (
                  <Listelement key={index}>
                    <label>
                      <Checkbox
                        type="checkbox"
                        checked={el.doc.done}
                        onChange={() => {
                          var tmp = el.doc;
                          tmp['done'] = !tmp['done'];
                          this.writeDB(tmp);
                        }}
                      />
                      <Description>{el.doc.desc}</Description>
                    </label>
                  </Listelement>
                );
              })}
            </List>
          }
        </Section>
        <Section>
          <Header onClick={() => {this.setState({type: 'a'});}}>Termine +</Header>
          {appointmentsOfToday.length === 0
            ? <Infotext>Heute keine Termine!</Infotext>
            : <List>
              {appointmentsOfToday.map((el, index) => {
                return (
                  <Listelement key={index}>
                    {'[' + el.doc.time + '] ' + el.doc.desc}
                  </Listelement>
                );
              })}
            </List>
          }
        </Section>
        <PaleSection>
          <Header>Kommende Termine</Header>
          {/* {this.state.upcoming_appointments.length == 0
            ? <Infotext>Keine Termine in den nächsten {this.state.numNextDays} Tagen!</Infotext>
            : <List>
              {this.state.upcoming_appointments.map((element, index) => {
                return (
                  <Listelement key={index}>
                    {'[' + element.year + '-' + element.month + '-' + element.day + ' '
                      + ('0' + element.hour).slice(-2) + ':'
                      + ('0' + element.minute).slice(-2) + '] ' + element.desc}
                  </Listelement>
                );
              })}
            </List>
          } */}
        </PaleSection>
        <Section>
          {tasksOfToday.every(el => el.doc.done) && appointmentsOfToday.every(el => el.doc.done)
            ? <Successtext>Alle Aufgaben erfüllt!</Successtext>
            : null
          }
        </Section>
      </ContentWrapper>
    );
  }
}

export default App;