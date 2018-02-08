import React, {Component} from 'react';
import PouchDB from 'pouchdb';
import moment from 'moment';

import Recur from './Recur.js';
import {
  Page, ContentWrapper, Section, PlusButton, Header, Infotext,
  CBButton, Successtext, Table, TRow, TCell, OButton, Subsection
} from './components.js';
import Form from './Form.js';

function keysort(key, order='asc') {
  let sortorder = order === 'asc' ? 1 : -1;
  return function (a, b) {
    let result = (a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0;
    return result * sortorder;
  }
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
      formType: '',
      formMode: '',
      dptr: {}
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
            if (Recur.matches(doc, moment().add(j, 'days'))) {
              doc = JSON.parse(JSON.stringify(doc));
              doc.futuredate = moment().add(j, 'days').format('YYYY-MM-DD');
              uearr.push(doc);
            }
          }
        }
      }
      uearr.sort((a, b) => {
        if (a.futuredate < b.futuredate) return -1;
        if (a.futuredate > b.futuredate) return 1;
        return 0;
      })
      let ctarr = result.rows.filter(el => el.doc.type === 'task' && Recur.matches(el.doc, moment())).map(el => el.doc).sort(keysort('summ'));
      let cearr = result.rows.filter(el => el.doc.type === 'event' && Recur.matches(el.doc, moment())).map(el => el.doc).sort(keysort('r_time'));
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
    } else {
      tmp[cdate].splice(index, 1);
    }
    this.writeToDB(tmp);
  }

  render() {
    let cdate = moment().format('YYYY-MM-DD');
    if (this.state.formType) {
      return (
        <Form
          type={this.state.formType}
          mode={this.state.formMode}
          data={this.state.dptr}
          save={(obj) => {
            this.writeToDB(obj);
            this.setState({formType: '', formMode: ''});
          }}
          discard={() => {
            this.setState({formType: '', formMode: ''});
          }}
          delete={(obj) => {
            this.deleteFromDB(obj);
            this.setState({formType: '', formMode: ''});
          }}
        />
      );
    }
    return (
      <Page>
        <ContentWrapper>
          <Section>
            <PlusButton
              size='24px'
              float='right'
              margin='10px 6px 0 0'
              weight='thick'
              onClick={() => {this.setState({dptr: {}, formType: 'task', formMode: 'new'});}}
            />
            <Header>Aufgaben</Header>
            <Subsection>
              {this.state.currentTasksArr.length === 0
                ? <Infotext>Heute keine Aufgaben!</Infotext>
                : <Table>
                  <tbody>
                    {this.state.currentTasksArr.map((doc, index) => {
                      let checked = this.state.cotdoc[cdate] && this.state.cotdoc[cdate].findIndex(id => id === doc._id) > -1;
                      return (
                        <TRow key={index}>
                          <TCell onClick={() => {this.toggleTask(doc._id)}}>
                            <CBButton
                              size='16px'
                              display='table-cell'
                              checked={checked}
                            />
                          </TCell>
                          <TCell primary opaque={checked} onClick={() => {this.toggleTask(doc._id)}}>{doc.summ}</TCell>
                          <TCell>
                            <OButton
                              size='16px'
                              display='table-cell'
                              onClick={() => {this.setState({dptr: doc, formType: 'task', formMode: 'edit'})}}
                            />
                          </TCell>
                        </TRow>
                      );
                    })}
                  </tbody>
                </Table>
              }
            </Subsection>
          </Section>
          <Section>
            <PlusButton
              size='24px'
              float='right'
              margin='10px 6px 0 0'
              weight='thick'
              onClick={() => {this.setState({dptr: {}, formType: 'event', formMode: 'new'});}}
            />
            <Header>Termine</Header>
            {this.state.currentEventsArr.length === 0
              ? <Infotext>Heute keine Termine!</Infotext>
              : <Table>
                <tbody>
                  {this.state.currentEventsArr.map((doc, index) => {
                    return (
                      <TRow key={index}>
                        <TCell primary opaque={moment().format('HH:mm') > doc.r_time}>{'[' + doc.r_time + '] ' + doc.summ}</TCell>
                        <TCell>
                          <OButton
                            size='16px'
                            onClick={() => {this.setState({dptr: doc, formType: 'event', formMode: 'edit'})}}
                          />
                        </TCell>
                      </TRow>
                    );
                  })}
                </tbody>
              </Table>
            }
          </Section>
          <Section opaque>
            <Header>Kommende Termine</Header>
            {this.state.upcomingEventsArr.length === 0
              ? <Infotext>Keine Termine in den nächsten {this.state.numUpcoming} Tagen!</Infotext>
              : <Table>
                <tbody>
                  {this.state.upcomingEventsArr.map((doc, index) => {
                    return (
                      <TRow key={index}>
                        <TCell primary>{'[' + doc.futuredate + ' ' + doc.r_time + '] ' + doc.summ}</TCell>
                        <TCell>
                          <OButton
                            size='16px'
                            onClick={() => {this.setState({dptr: doc, formType: 'event', formMode: 'edit'})}}
                          />
                        </TCell>
                      </TRow>
                    );
                  })}
                </tbody>
              </Table>
            }
          </Section>
        </ContentWrapper>
      </Page>
    );
  }
}

export default App;