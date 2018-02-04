import React, {Component} from 'react';
import styled from 'styled-components';
import PouchDB from 'pouchdb';
import moment from 'moment';

const fontcolor = 'rgb(184, 184, 184)';
const bgcolor = 'rgb(33, 34, 37)';
const accentcolor = 'rgb(111, 178, 156)';

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: ${bgcolor};
  color: ${fontcolor};
`;

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
  padding: 12px;
`;

const Section = styled.div`
  margin-top: 48px;
`;

const PaleSection = Section.extend`
  opacity: 0.3;
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
  background-color: ${fontcolor};
  border: none;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 128px;
  background-color: ${fontcolor};
`;

const Inputlabel = styled.label`
  display: block;
`;

const ButtonBox = styled.div`
  display: inline-block;
  background-color: ${accentcolor};
  cursor: pointer;
  padding: 8px;
`;

const PlusButtonBox = ButtonBox.extend`
  float: right;
`;

const TextButtonBox = ButtonBox.extend`
  margin-left: 16px;
  &:first-child {
    margin-left: 0;
  }
`;

const ButtonText = styled.p`
  color: black;
  /* display: flex; */
  /* justify-content: center; */
  /* align-content: center; */
  /* flex-direction: column; */
  /* text-align: center; */
  /* font-weight: bold; */
`;

const SVGPath = styled.path`
  stroke: black;
  stroke-width: 16;
`;

const SVG = styled.svg`
  display: block;
  width: 24px;
  height: 24px;
`;

const PlusButton = (props) => {
  return (
    <PlusButtonBox onClick={props.onClick}>
      <SVG viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <SVGPath d="M50 0 L50 100 M0 50 L100 50"></SVGPath>
      </SVG>
    </PlusButtonBox>
  );
}

const TextButton = (props) => {
  return (
    <TextButtonBox onClick={props.onClick}>
      <ButtonText>{props.children}</ButtonText>
    </TextButtonBox>
  );
}

const Link = styled.a`
  color: ${accentcolor};
  cursor: pointer;
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
      currentTasksArr: [],
      currentAppointmentsArr: [],
      upcomingAppointmentsArr: [],
      numUpcoming: 7,
      _id: '',
      type: '',
      summ: '',
      desc: '',
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
      var modUAArr = [];
      for (var i = 0; i < result.rows.length; i++) {
        for (var j = 1; j < this.state.numUpcoming; j++) {
          if (result.rows[i].doc.type === 'a') {
            var doc = result.rows[i].doc;
            if (match(moment().add(j, 'days'), doc.rid, doc.sd, doc.ed)) {
              var tmp = JSON.parse(JSON.stringify(result.rows[i]));
              tmp.doc.date = moment().add(j, 'days').format('YYYY-MM-DD');
              modUAArr.push(tmp);
            }
          }
        }
      }
      modUAArr.sort((a, b) => {
        if (a.doc.date < b.doc.date) return -1;
        if (a.doc.date > b.doc.date) return 1;
        return 0;
      })
      this.setState({
        currentTasksArr: result.rows.filter(el => {
          return el.doc.type === 't' && match(moment(), el.doc.rid, el.doc.sd, el.doc.ed)
        }),
        currentAppointmentsArr: result.rows.filter(el => {
          return el.doc.type === 'a' && match(moment(), el.doc.rid, el.doc.sd, el.doc.ed)
        }),
        upcomingAppointmentsArr: modUAArr
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
    if (this.state.type) {
      return (
        <Page>
          <ContentWrapper>
            <Section>
              <Header>{this.state.type === 't' ? 'Neue Aufgabe' : 'Neuer Termin'}</Header>
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
                <TextButton
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
                >Eintragen</TextButton>
                <TextButton onClick={() => {this.setState({type: ''});}}>Abbrechen</TextButton>
              </Inputfield>
            </Section>
          </ContentWrapper>
        </Page>
      );
    }
    return (
      <Page>
        <ContentWrapper>
          <Section>
            <PlusButton onClick={() => {this.setState({type: 't'});}} />
            <Header>Aufgaben</Header>
            {this.state.currentTasksArr.length === 0
              ? <Infotext>Heute keine Aufgaben! <Link
                onClick={() => {this.setState({type: 't'});}}
              >hinzufügen</Link>.</Infotext>
              : <List>
                {this.state.currentTasksArr.map((el, index) => {
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
                        <Description>{el.doc.summ}</Description>
                      </label>
                    </Listelement>
                  );
                })}
              </List>
            }
          </Section>
          <Section>
            <PlusButton onClick={() => {this.setState({type: 'a'});}} />
            <Header>Termine</Header>
            {this.state.currentAppointmentsArr.length === 0
              ? <Infotext>Heute keine Termine!</Infotext>
              : <List>
                {this.state.currentAppointmentsArr.map((el, index) => {
                  return (
                    <Listelement key={index}>
                      {'[' + el.doc.time + '] ' + el.doc.summ}
                    </Listelement>
                  );
                })}
              </List>
            }
          </Section>
          <PaleSection>
            <Header>Kommende Termine</Header>
            {this.state.upcomingAppointmentsArr.length == 0
              ? <Infotext>Keine Termine in den nächsten 7 Tagen!</Infotext>
              : <List>
                {this.state.upcomingAppointmentsArr.map((el, index) => {
                  return (
                    <Listelement key={index}>
                      {'[' + el.doc.date + ' ' + el.doc.time + '] ' + el.doc.summ}
                    </Listelement>
                  );
                })}
              </List>
            }
          </PaleSection>
          <Section>
            {this.state.currentTasksArr.every(el => el.doc.done)
              ? <Successtext>Alle Aufgaben erfüllt!</Successtext>
              : null
            }
          </Section>
        </ContentWrapper>
      </Page>
    );
  }
}

export default App;