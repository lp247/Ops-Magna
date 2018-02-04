import React, {Component} from 'react';
import PouchDB from 'pouchdb';
import moment from 'moment';

import {
  Page, ContentWrapper, Section, PlusButton, Header, Infotext,
  CBButton, PaleSection, Successtext, XButton, Table, TRow, TCell, OButton
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
      cotdoc: {},
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
    this.deleteFromDB = this.deleteFromDB.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
  }

  componentDidMount() {
    this.readDB();
  }

  readDB() {
    this.localDB.allDocs({include_docs: true}).then((result) => {
      let uearr = [];
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
      let ctarr = result.rows.filter(el => el.doc.type === 'task' && match(moment(), el.doc.rid, el.doc.sd, el.doc.ed)).map(el => el.doc);
      let cearr = result.rows.filter(el => el.doc.type === 'event' && match(moment(), el.doc.rid, el.doc.sd, el.doc.ed)).map(el => el.doc);
      let cotdoc = (result.rows.find(el => el.doc._id === 'cotid') || {doc: {_id: 'cotid'}}).doc;
      this.setState({currentTasksArr: ctarr, currentEventsArr: cearr, upcomingEventsArr: uearr, cotdoc: cotdoc});
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

  toggleTask(taskid) {
    let cdate = moment().format('YYYY-MM-DD');
    let tmp = this.state.cotdoc;
    if (!tmp[cdate]) {
      tmp[cdate] = [];
    }
    let index = this.state.cotdoc[cdate].findIndex(id => id === taskid);
    if (index === -1) {
      tmp[cdate] = [...tmp[cdate], taskid];
      this.writeToDB(tmp);
    } else {
      tmp[cdate].splice(index, 1);
      this.writeToDB(tmp);
    }
  }

  render() {
    let cdate = moment().format('YYYY-MM-DD');
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
          delete={(obj) => {
            this.deleteFromDB(obj);
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
                        <TCell onClick={() => {this.toggleTask(doc._id)}}>
                          <CBButton
                            size={20}
                            display='table-cell'
                            checked={this.state.cotdoc[cdate] && this.state.cotdoc[cdate].findIndex(id => id === doc._id) > -1}
                          />
                        </TCell>
                        <TCell primary onClick={() => {this.toggleTask(doc._id)}}>{doc.summ}</TCell>
                        <TCell>
                          <OButton
                            size={20}
                            display='table-cell'
                            onClick={() => {this.setState({dptr: doc, newEntry: 'task'})}}
                          />
                        </TCell>
                        {/* <TCell>
                          <XButton
                            size={20}
                            display='table-cell'
                            onClick={() => {this.deleteFromDB(doc)}}
                          />
                        </TCell> */}
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
              ? <Infotext>Heute keine Termine!</Infotext>
              : <Table>
                <tbody>
                  {this.state.currentEventsArr.map((doc, index) => {
                    return (
                      <TRow key={index}>
                        <TCell primary>{'[' + doc.time + '] ' + doc.summ}</TCell>
                        <TCell>
                          <OButton
                            size={20}
                            onClick={() => {this.setState({dptr: doc, newEntry: 'event'})}}
                          />
                        </TCell>
                        {/* <TCell>
                          <XButton
                            size={20}
                            onClick={() => {this.deleteFromDB(doc)}}
                          />
                        </TCell> */}
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
                            onClick={() => {this.setState({dptr: doc, newEntry: 'event'})}}
                          />
                        </TCell>
                        {/* <TCell>
                          <XButton
                            size={20}
                            onClick={() => {this.deleteFromDB(doc)}}
                          />
                        </TCell> */}
                      </TRow>
                    );
                  })}
                </tbody>
              </Table>
            }
          </PaleSection>
          <Section>
            {this.state.cotdoc[cdate] && this.state.currentTasksArr.map(doc => doc._id).sort().join(',') === this.state.cotdoc[cdate].sort().join(',')
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