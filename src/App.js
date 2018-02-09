import React, {Component} from 'react';
import PouchDB from 'pouchdb';
import moment from 'moment';

import Recur from './Recur.js';
import {
  Page, ContentWrapper, Section, PlusButton, Header, Infotext,
  CBButton, Table, TRow, TCell, OButton, Subsection, RhombusButton
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
      allTasks: [],
      allEvents: [],
      currentTasks: [],
      currentEvents: [],
      upcomingEvents: [],
      cotdoc: {},
      numUpcoming: 7,
      showAllTasks: false,
      showAllEvents: false,
      page: '',
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
      let upcomingEvents = [];
      for (var i = 0; i < result.rows.length; i++) {
        for (var j = 1; j < this.state.numUpcoming; j++) {
          if (result.rows[i].doc.type === 'event') {
            var doc = result.rows[i].doc;
            if (Recur.matches(doc, moment().add(j, 'days'))) {
              doc = JSON.parse(JSON.stringify(doc));
              doc.futuredate = moment().add(j, 'days').format('YYYY-MM-DD');
              upcomingEvents.push(doc);
            }
          }
        }
      }
      upcomingEvents.sort((a, b) => {
        if (a.futuredate < b.futuredate) return -1;
        if (a.futuredate > b.futuredate) return 1;
        return 0;
      })
      let allTasks = result.rows.filter(el => el.doc.type === 'task').map(el => el.doc);
      let allEvents = result.rows.filter(el => el.doc.type === 'event').map(el => el.doc);
      let currentTasks = allTasks.filter(doc => Recur.matches(doc, moment())).sort(keysort('summ'));
      let currentEvents = allEvents.filter(doc => Recur.matches(doc, moment())).sort(keysort('r_time'));
      let cotdoc = (result.rows.find(el => el.doc._id === 'cotid') || {doc: {_id: 'cotid'}}).doc;
      this.setState({allTasks, allEvents, currentTasks, currentEvents, upcomingEvents, cotdoc});
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
    if (this.state.page === 'form') {
      return (
        <Form
          type={this.state.formType}
          mode={this.state.formMode}
          data={this.state.dptr}
          save={(obj) => {
            this.writeToDB(obj);
            this.setState({formType: '', formMode: '', page: ''});
          }}
          discard={() => {
            this.setState({formType: '', formMode: '', page: ''});
          }}
          delete={(obj) => {
            this.deleteFromDB(obj);
            this.setState({formType: '', formMode: '', page: ''});
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
              margin='10px 6px 0 24px'
              weight='thick'
              onClick={() => {this.setState({dptr: {}, formType: 'task', formMode: 'new', page: 'form'});}}
            />
            <RhombusButton
              size='24px'
              float='right'
              margin='10px 6px 0 24px'
              weight='thick'
              checked={this.state.showAllTasks}
              onClick={e => this.setState({showAllTasks: !this.state.showAllTasks})}
            />
            <Header>Aufgaben</Header>
            <Subsection>
              {this.state.showAllTasks
                ? (this.state.allTasks.length === 0
                  ? <Infotext>Keine Aufgaben!</Infotext>
                  : <Table>
                    <tbody>
                      {this.state.allTasks.map((doc, index) => {
                        return (
                          <TRow key={index}>
                            <TCell primary>{doc.summ}</TCell>
                            <TCell>
                              <OButton
                                size='16px'
                                display='table-cell'
                                onClick={() => {this.setState({dptr: doc, formType: 'task', formMode: 'edit', page: 'form'})}}
                              />
                            </TCell>
                          </TRow>
                        );
                      })}
                    </tbody>
                  </Table>
                )
                : (this.state.currentTasks.length === 0
                  ? <Infotext>Heute keine Aufgaben!</Infotext>
                  : <Table>
                    <tbody>
                      {this.state.currentTasks.map((doc, index) => {
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
                                onClick={() => {this.setState({dptr: doc, formType: 'task', formMode: 'edit', page: 'form'})}}
                              />
                            </TCell>
                          </TRow>
                        );
                      })}
                    </tbody>
                  </Table>
                )
              }
            </Subsection>
          </Section>
          <Section>
            <PlusButton
              size='24px'
              float='right'
              margin='10px 6px 0 24px'
              weight='thick'
              onClick={() => {this.setState({dptr: {}, formType: 'event', formMode: 'new', page: 'form'});}}
            />
            <RhombusButton
              size='24px'
              float='right'
              margin='10px 6px 0 24px'
              weight='thick'
              checked={this.state.showAllEvents}
              onClick={e => this.setState({showAllEvents: !this.state.showAllEvents})}
            />
            <Header>Termine</Header>
            <Subsection>
              {this.state.showAllEvents
                ? (this.state.allEvents.length === 0
                  ? <Infotext>Keine Termine!</Infotext>
                  : <Table>
                    <tbody>
                      {this.state.allEvents.map((doc, index) => {
                        return (
                          <TRow key={index}>
                            <TCell primary>{doc.summ}</TCell>
                            <TCell>
                              <OButton
                                size='16px'
                                display='table-cell'
                                onClick={() => {this.setState({dptr: doc, formType: 'task', formMode: 'edit', page: 'form'})}}
                              />
                            </TCell>
                          </TRow>
                        );
                      })}
                    </tbody>
                  </Table>
                )
                : (this.state.currentEvents.length === 0
                  ? <Infotext>Heute keine Termine!</Infotext>
                  : <Table>
                    <tbody>
                      {this.state.currentEvents.map((doc, index) => {
                        return (
                          <TRow key={index}>
                            <TCell primary opaque={moment().format('HH:mm') > doc.r_time}>{'[' + doc.r_time + '] ' + doc.summ}</TCell>
                            <TCell>
                              <OButton
                                size='16px'
                                onClick={() => {this.setState({dptr: doc, formType: 'event', formMode: 'edit', page: 'form'})}}
                              />
                            </TCell>
                          </TRow>
                        );
                      })}
                    </tbody>
                  </Table>
                )
              }
            </Subsection>
          </Section>
          <Section opaque>
            <Header>Kommende Termine</Header>
            <Subsection>
              {this.state.upcomingEvents.length === 0
                ? <Infotext>Keine Termine in den nächsten {this.state.numUpcoming} Tagen!</Infotext>
                : <Table>
                  <tbody>
                    {this.state.upcomingEvents.map((doc, index) => {
                      return (
                        <TRow key={index}>
                          <TCell primary>{'[' + doc.futuredate + ' ' + doc.r_time + '] ' + doc.summ}</TCell>
                          <TCell>
                            <OButton
                              size='16px'
                              onClick={() => {this.setState({dptr: doc, formType: 'event', formMode: 'edit', page: 'form'})}}
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
        </ContentWrapper>
      </Page>
    );
  }
}

export default App;