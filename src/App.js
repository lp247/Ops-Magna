import React, {Component} from 'react';
import PouchDB from 'pouchdb';
import moment from 'moment';
import autosize from 'autosize';

import Recur from './Recur.js';
import {
  Page, ContentWrapper, Section, PlusButton, Header, Infotext, CBButton, Table, TRow, TCell, OButton, Subsection, RhombusButton, Input
} from './components.js';
import Form from './Form.js';

function keysort(key, order='asc') {
  let sortorder = order === 'asc' ? 1 : -1;
  return function (a, b) {
    if (!a[key] && !b[key]) return 0;
    if (!a[key] && !!b[key]) return 1;
    if (!!a[key] && !b[key]) return -1;
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
      dayChangeHour: 5,
      cotdoc: {},
      numUpcoming: 7,
      showAllTasks: false,
      showAllEvents: false,
      fastTaskInput: null,
      fastTaskText: '',
      fastEventInput: null,
      fastEventText: '',
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
    this.showForm = this.showForm.bind(this);
    this.fastInsert = this.fastInsert.bind(this);
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
      let allTasks = result.rows.filter(el => el.doc.type === 'task').map(el => el.doc).sort(keysort('summ'));
      let allEvents = result.rows.filter(el => el.doc.type === 'event').map(el => el.doc).sort(keysort('summ'));
      let currentTasks = allTasks.filter(doc => Recur.matches(doc, moment().subtract(this.state.dayChangeHour, 'hours'))).sort(keysort('r_time'));
      let currentEvents = allEvents.filter(doc => Recur.matches(doc, moment().subtract(this.state.dayChangeHour, 'hours'))).sort(keysort('r_time'));
      let cotdoc = (result.rows.find(el => el.doc._id === 'cotid') || {doc: {_id: 'cotid'}}).doc;
      this.setState({allTasks, allEvents, currentTasks, currentEvents, upcomingEvents, cotdoc});
    }).catch((err) => {
      throw err;
    });
  }

  writeToDB(doc) {
    return this.localDB.put(doc).catch(err => {
      throw err;
    });
  }

  deleteFromDB(doc) {
    doc._deleted = true;
    return this.writeToDB(doc);
  }

  toggleTask(taskid) {
    let cdate = moment().subtract(this.state.dayChangeHour, 'hours').format('YYYY-MM-DD');
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

  showForm(type, mode, dptr = {}) {
    this.setState({
      dptr,
      formType: type,
      formMode: mode,
      page: 'form'
    });
    if (type === 'task') {
      this.setState({fastTaskText: ''});
    } else {
      this.setState({fastEventText: ''});
    }
  }

  fastInsert(type, summ) {
    if (!summ) {
      alert('Geben Sie eine Beschreibung an!');
    } else {
      this.writeToDB({
        single: true,
        _id: moment().format(),
        _rev: '',
        type,
        summ,
        desc: '',
        r_months: [],
        r_weeks: [],
        r_days: [],
        r_time: '',
        r_start: moment().format('YYYY-MM-DD'),
        r_end: ''
      }).then(() => {
        if (type === 'task') {
          this.setState({fastTaskText: ''});
        } else {
          this.setState({fastEventText: ''});
        }
      });
    }
  }

  render() {
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
    var cdate = moment().subtract(this.state.dayChangeHour, 'hours').format('YYYY-MM-DD');
    return (
      <Page>
        <ContentWrapper>
          <Section>
            <RhombusButton
              size='24px'
              float='right'
              margin='10px 6px 0 24px'
              weight='thick'
              checked={this.state.showAllTasks}
              onClick={e => this.setState({showAllTasks: !this.state.showAllTasks})}
            />
            <Header>Aufgaben ({(this.state.cotdoc[cdate] || []).length}/{this.state.currentTasks.length})</Header>
            <Subsection>
              <Table>
                <tbody>
                  {this.state.showAllTasks
                    ? this.state.allTasks.map((doc, index) => {
                      return (
                        <TRow key={index}>
                          <TCell><OButton size='16px' nopointer='true' checked='true' /></TCell>
                          <TCell primary>{doc.summ}</TCell>
                          <TCell>
                            <OButton
                              size='16px'
                              onClick={() => {this.showForm('task', 'edit', doc)}}
                            />
                          </TCell>
                        </TRow>
                      );
                    })
                    : this.state.currentTasks.map((doc, index) => {
                      let checked = this.state.cotdoc[cdate] && this.state.cotdoc[cdate].findIndex(id => id === doc._id) > -1;
                      return (
                        <TRow key={index}>
                          <TCell onClick={() => {this.toggleTask(doc._id)}}>
                            <CBButton
                              size='16px'
                              checked={checked}
                            />
                          </TCell>
                          <TCell primary opaque={checked} onClick={() => {this.toggleTask(doc._id)}}>{doc.r_time ? '[' + doc.r_time + '] ' + doc.summ : doc.summ}</TCell>
                          <TCell>
                            <OButton
                              size='16px'
                              onClick={() => {this.showForm('task', 'edit', doc)}}
                            />
                          </TCell>
                        </TRow>
                      );
                    })
                  }
                  <TRow>
                    <TCell>
                      <PlusButton
                        size='16px'
                        onClick={() => {this.fastInsert('task', this.state.fastTaskText)}}
                      />
                    </TCell>
                    <TCell primary padding='0px 10px'>
                      <Input type='textarea' value={this.state.fastTaskText} onChange={e => {
                        if (e.target.value.endsWith('\n')) {
                          this.fastInsert('task', e.target.value.slice(0, -1));
                        } else {
                          autosize(e.target);
                          this.setState({fastTaskText: e.target.value});
                        }
                      }} />
                    </TCell>
                    <TCell>
                      <OButton
                        size='16px'
                        onClick={() => {this.showForm('task', 'new', {summ: this.state.fastTaskText})}}
                      />
                    </TCell>
                  </TRow>
                </tbody>
              </Table>
            </Subsection>
          </Section>
          <Section>
            <RhombusButton
              size='24px'
              float='right'
              margin='10px 6px 0 24px'
              weight='thick'
              checked={this.state.showAllEvents}
              onClick={e => this.setState({showAllEvents: !this.state.showAllEvents})}
            />
            <Header>Termine ({this.state.currentEvents.length})</Header>
            <Subsection>
              <Table>
                <tbody>
                  {this.state.showAllEvents
                    ? this.state.allEvents.map((doc, index) => {
                      return (
                        <TRow key={index}>
                          <TCell><OButton size='16px' nopointer='true' checked='true' /></TCell>
                          <TCell primary>{doc.summ}</TCell>
                          <TCell>
                            <OButton
                              size='16px'
                              onClick={() => {this.showForm('event', 'edit', doc)}}
                            />
                          </TCell>
                        </TRow>
                      );
                    })
                    : this.state.currentEvents.map((doc, index) => {
                      return (
                        <TRow key={index}>
                          <TCell><OButton size='16px' nopointer='true' checked='true' /></TCell>
                          <TCell primary opaque={moment().format('HH:mm') > doc.r_time}>{doc.r_time ? '[' + doc.r_time + '] ' + doc.summ : doc.summ}</TCell>
                          <TCell>
                            <OButton
                              size='16px'
                              onClick={() => {this.showForm('event', 'edit', doc)}}
                            />
                          </TCell>
                        </TRow>
                      );
                    })
                  }
                  <TRow>
                    <TCell>
                      <PlusButton
                        size='16px'
                        onClick={() => {this.fastInsert('event', this.state.fastEventText)}}
                      />
                    </TCell>
                    <TCell primary padding='0px 10px'>
                      <Input type='textarea' value={this.state.fastEventText} onChange={e => {
                        if (e.target.value.endsWith('\n')) {
                          this.fastInsert('event', e.target.value.slice(0, -1));
                        } else {
                          autosize(e.target);
                          this.setState({fastEventText: e.target.value});
                        }
                      }} />
                    </TCell>
                    <TCell>
                      <OButton
                        size='16px'
                        onClick={() => {this.showForm('event', 'new', {summ: this.state.fastEventText})}}
                      />
                    </TCell>
                  </TRow>
                </tbody>
              </Table>
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
                              onClick={() => {this.showForm('event', 'edit', doc)}}
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