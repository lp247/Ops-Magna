import React from 'react';
import moment from 'moment';
import {Table, TCell} from './sc/table';
import {CBButton, PlusButton, OButton} from './sc/buttons';
import {Input} from './sc/inputs';
import {Section, Subsection} from './sc/container';
import {Header} from './sc/texts';

const EntryList = ({
  entries,
  header,
  toggleEntry,
  editEntry,
  fastInputUpdater,
  fastAddEntry
}) => (
  <Section>
    <Header>{header}</Header>
    <Subsection>
      <Table>
        <tbody>
          {entries.rest().map((entry, index) => {
            return (
              <tr key={index}>
                <TCell>
                <CBButton
                  size='16px'
                  vertical={toggleEntry ? entry.get('data').get('doneAt').includes(moment().format('YYYY-MM-DD')) : false}
                  inactive={!toggleEntry}
                  onClick={toggleEntry ? () => toggleEntry(entry.get('data').get('id')) : null}
                />
                </TCell>
                <TCell
                  primary
                  opaque={toggleEntry ? entry.get('data').get('doneAt').includes(moment().format('YYYY-MM-DD')) : false}
                  onClick={toggleEntry ? () => toggleEntry(entry.get('data').get('id')) : null}
                >{entry.get('data').get('summ')}</TCell>
                <TCell>
                  <OButton
                    size='16px'
                    onClick={() => {editEntry(entry.get('data').get('id'))}}
                  />
                </TCell>
              </tr>
            );
          })}
          <tr>
            <TCell>
              <PlusButton
                size='16px'
                onClick={() => {fastAddEntry()}}
              />
            </TCell>
            <TCell primary padding='0px 10px'>
              <Input
                type='textarea'
                value={entries.get(0).get('data').get('summ')}
                onChange={(e) => {
                  fastInputUpdater(e);
                  // autosize(e.target);
                }}
              />
            </TCell>
            <TCell>
              <OButton
                size='16px'
                onClick={() => {editEntry('new')}}
              />
            </TCell>
          </tr>
        </tbody>
      </Table>
    </Subsection>
  </Section>
);

export default EntryList;