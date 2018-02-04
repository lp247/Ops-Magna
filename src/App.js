import React, {Component} from 'react';
import PouchDB from 'pouchdb';
import moment from 'moment';

import {
  Page, ContentWrapper, Section, PlusButton, Header, Infotext,
  Checkbox, PaleSection, Successtext, XButton, Table, TRow, TCell, OButton
} from './components.js';
import NewEntry from './NewEntry.js';

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
      currentEventsArr: [],
      upcomingEventsArr: [],
      numUpcoming: 7,
      newEntry: '',
      dptr: {}
      // _id: '',
      // summ: '',
      // desc: '',
      // done: false,
      // rid: '',
      // sd: '',
      // ed: '',
      // time: ''
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
    this.writeToDB = this.writeToDB.bind(this);
  }

  componentDidMount() {
    this.readDB();
  }

  readDB() {
    this.localDB.allDocs({include_docs: true}).then((result) => {
      var uearr = [];
      for (var i = 0; i < result.rows.length; i++) {
        for (var j = 1; j < this.state.numUpcoming; j++) {
          if (result.rows[i].doc.type === 'event') {
            var doc = result.rows[i].doc;
            if (match(moment().add(j, 'days'), doc.rid, doc.sd, doc.ed)) {
              var tmp = JSON.parse(JSON.stringify(doc));
              tmp.date = moment().add(j, 'days').format('YYYY-MM-DD');
              uearr.push(tmp);
            }
          }
        }
      }
      uearr.sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      })
      var ctarr = result.rows.filter(el => el.doc.type === 'task' && match(moment(), el.doc.rid, el.doc.sd, el.doc.ed)).map(el => el.doc);
      var cearr = result.rows.filter(el => el.doc.type === 'event' && match(moment(), el.doc.rid, el.doc.sd, el.doc.ed)).map(el => el.doc);
      this.setState({currentTasksArr: ctarr, currentEventsArr: cearr, upcomingEventsArr: uearr});
    }).catch((err) => {
      throw err;
    });
  }

  writeToDB(doc) {
    this.localDB.put(doc).catch(err => {
      throw err;
    });
  }

  deleteFromDB(doc) {
    doc._deleted = true;
    return this.writeToDB(doc);
  }

  render() {
    if (this.state.newEntry) {
      return (
        <NewEntry
          type={this.state.newEntry}
          data={this.state.dptr}
          save={(obj) => {
            this.writeToDB(obj);
            this.setState({newEntry: ''});
          }}
          discard={() => {
            this.setState({newEntry: ''});
          }}
        />
      );
    }
    return (
      <Page>
        <ContentWrapper>
          <Section>
            <PlusButton
              size={40}
              float='right'
              onClick={() => {this.setState({dptr: {}, newEntry: 'task'});}}
            />
            <Header>Aufgaben</Header>
            {this.state.currentTasksArr.length === 0
              ? <Infotext>Heute keine Aufgaben!</Infotext>
              : <Table>
                <tbody>
                  {this.state.currentTasksArr.map((doc, index) => {
                    return (
                      <TRow key={index}>
                        <TCell>
                          <Checkbox
                            type='checkbox'
                            id={doc._id}
                            checked={doc.done}
                            onChange={() => {
                              var tmp = doc;
                              tmp['done'] = !tmp['done'];
                              this.writeToDB(tmp);
                            }}
                          />
                        </TCell>
                        <TCell primary><label htmlFor={doc._id}>{doc.summ}</label></TCell>
                        <TCell>
                          <OButton
                            size={20}
                            float='right'
                            inverted
                            onClick={() => {this.setState({dptr: doc, newEntry: 'task'})}}
                          />
                        </TCell>
                        <TCell>
                          <XButton
                            size={20}
                            float='right'
                            inverted={true}
                            onClick={() => {this.deleteFromDB(doc)}}
                          />
                        </TCell>
                      </TRow>
                    );
                  })}
                </tbody>
              </Table>
            }
          </Section>
          <Section>
            <PlusButton
              size={40}
              float='right'
              onClick={() => {this.setState({dptr: {}, newEntry: 'event'});}}
            />
            <Header>Termine</Header>
            {this.state.currentEventsArr.length === 0
              ? <Infotext>Heute keine Aufgaben!</Infotext>
              : <Table>
                <tbody>
                  {this.state.currentEventsArr.map((doc, index) => {
                    return (
                      <TRow key={index}>
                        <TCell primary>{'[' + doc.time + '] ' + doc.summ}</TCell>
                        <TCell>
                          <OButton
                            size={20}
                            float='right'
                            inverted
                            onClick={() => {this.setState({dptr: doc, newEntry: 'event'})}}
                          />
                        </TCell>
                        <TCell>
                          <XButton
                            size={20}
                            float='right'
                            inverted={true}
                            onClick={() => {this.deleteFromDB(doc)}}
                          />
                        </TCell>
                      </TRow>
                    );
                  })}
                </tbody>
              </Table>
            }
          </Section>
          <PaleSection>
            <Header>Kommende Termine</Header>
            {this.state.upcomingEventsArr.length === 0
              ? <Infotext>Keine Aufgaben in den nächsten {this.state.numUpcoming} Tagen!</Infotext>
              : <Table>
                <tbody>
                  {this.state.upcomingEventsArr.map((doc, index) => {
                    return (
                      <TRow key={index}>
                        <TCell primary>{'[' + doc.date + ' ' + doc.time + '] ' + doc.summ}</TCell>
                        <TCell>
                          <OButton
                            size={20}
                            float='right'
                            inverted
                            onClick={() => {this.setState({dptr: doc, newEntry: 'event'})}}
                          />
                        </TCell>
                        <TCell>
                          <XButton
                            size={20}
                            float='right'
                            inverted={true}
                            onClick={() => {this.deleteFromDB(doc)}}
                          />
                        </TCell>
                      </TRow>
                    );
                  })}
                </tbody>
              </Table>
            }
          </PaleSection>
          <Section>
            {this.state.currentTasksArr.every(doc => doc.done)
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