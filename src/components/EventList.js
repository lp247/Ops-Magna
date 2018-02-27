import React from 'react';
import moment from 'moment';

import {Table, TCell} from '../sc/table';
import {CBButton, PlusButton, OButton, RhombusButton, StarButton} from '../sc/buttons';
import {Input} from '../sc/inputs';
import {Section, Subsection} from '../sc/container';
import {Header} from '../sc/texts';
import { ACCENT_COLOR, ACCENT_COLOR_03 } from '../utils/constants';

const EntryList = ({
  currentEntries,
  upcomingEntries,
  allEntries,
  fastInputObj,
  filter,
  editEntry,
  fastInputUpdater,
  fastAddEntry,
  toggleFilter
}) => (
  <Section>
    <RhombusButton
      size='24px'
      float='right'
      margin='10px 6px 0 24px'
      weight='thick'
      color={ACCENT_COLOR}
      checked={filter === 'SHOW_ALL'}
      onClick={toggleFilter}
    />
    <Header>Termine ({currentEntries.filter(e => e.getIn(['data', 'time']) < moment().format('HH:mm')).size}/{currentEntries.size})</Header>
    <Subsection>
      <Table>
        {filter === 'SHOW_ALL'
          ? <tbody>
            {allEntries.map((entry, index) => {
              return (
                <tr key={index}>
                  <TCell>
                    <CBButton
                      size='16px'
                      vertical={false}
                      color={ACCENT_COLOR}
                    />
                  </TCell>
                  <TCell
                    primary
                    lineThrough={false}
                  >{entry.getIn(['data', 'summ'])}</TCell>
                  <TCell>
                    <OButton
                      size='16px'
                      color={ACCENT_COLOR}
                      onClick={() => {editEntry(entry.getIn(['data', 'id']))}}
                    />
                  </TCell>
                </tr>
              );
            })}
          </tbody>
          : <tbody>
            {currentEntries.map((entry, index) => {
              return (
                <tr key={index}>
                  <TCell>
                    <CBButton
                      size='16px'
                      vertical={entry.getIn(['data', 'time']) && entry.getIn(['data', 'time']) < moment().format('HH:mm') ? true : false}
                      color={ACCENT_COLOR}
                    />
                  </TCell>
                  <TCell
                    primary
                    opacity={entry.getIn(['data', 'time']) && entry.getIn(['data', 'time']) < moment().format('HH:mm') ? 0.3 : 1.0}
                    lineThrough={entry.getIn(['data', 'time']) && entry.getIn(['data', 'time']) < moment().format('HH:mm') ? true : false}
                  >{entry.getIn(['data', 'time'])
                    ? '[' + entry.getIn(['data', 'time']) + '] ' + entry.getIn(['data', 'summ'])
                    : entry.getIn(['data', 'summ'])
                  }</TCell>
                  <TCell>
                    <OButton
                      size='16px'
                      color={ACCENT_COLOR}
                      onClick={() => {editEntry(entry.getIn(['data', 'id']))}}
                    />
                  </TCell>
                </tr>
              );
            })}
            {upcomingEntries.map((entry, index) => {
              return (
                <tr key={index}>
                  <TCell>
                    <StarButton
                      size='16px'
                      color={ACCENT_COLOR_03}
                    />
                  </TCell>
                  <TCell
                    primary
                    opacity={0.3}
                    lineThrough={false}
                  >{entry.getIn(['data', 'time'])
                    ? '[' + entry.getIn(['data', 'start']) + ' ' + entry.getIn(['data', 'time']) + '] ' + entry.getIn(['data', 'summ'])
                    : '[' + entry.getIn(['data', 'start']) + '] ' + entry.getIn(['data', 'summ'])
                  }</TCell>
                  <TCell>
                    <OButton
                      size='16px'
                      color={ACCENT_COLOR_03}
                      onClick={() => {editEntry(entry.getIn(['data', 'id']))}}
                    />
                  </TCell>
                </tr>
              );
            })}
            <tr>
              <TCell>
                <PlusButton
                  size='16px'
                  color={ACCENT_COLOR}
                  onClick={() => {fastAddEntry()}}
                />
              </TCell>
              <TCell primary padding='0px 10px'>
                <Input
                  type='textarea'
                  value={fastInputObj.getIn(['data', 'summ'])}
                  onChange={(e) => {
                    fastInputUpdater(e);
                  }}
                />
              </TCell>
              <TCell>
                <OButton
                  size='16px'
                  color={ACCENT_COLOR}
                  onClick={() => {editEntry('new')}}
                />
              </TCell>
            </tr>
          </tbody>
        }
      </Table>
    </Subsection>
  </Section>
);

export default EntryList;