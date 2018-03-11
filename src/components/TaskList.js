import React from 'react';
import {Table, TCell} from '../sc/table';
import {CBButton, PlusButton, OButton, RhombusButton, XButton} from '../sc/buttons';
import {Input} from '../sc/inputs';
import {Section, Subsection} from '../sc/container';
import {Header} from '../sc/texts';
import { ACCENT_COLOR, ACCENT_COLOR_03 } from '../utils/constants';

const EntryList = ({
  currentEntries,
  uncompletedEntries,
  allEntries,
  fastInputObj,
  filter,
  toggleEntry,
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
    <Header>Aufgaben</Header>
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
            {uncompletedEntries.map((entry, index) => {
              return (
                <tr key={index}>
                  <TCell>
                    <XButton
                      size='16px'
                      color={ACCENT_COLOR_03}
                      onClick={toggleEntry ? () => toggleEntry(entry.getIn(['data', 'id'])) : null}
                    />
                  </TCell>
                  <TCell
                    primary
                    opacity={0.3}
                  >{entry.getIn(['data', 'summ'])}</TCell>
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
            {currentEntries.map((entry, index) => {
              return (
                <tr key={index}>
                  <TCell>
                    <CBButton
                      size='16px'
                      vertical={toggleEntry ? entry.getIn(['data', 'lastExec', 'done']) : false}
                      color={ACCENT_COLOR}
                      onClick={toggleEntry ? () => toggleEntry(entry.getIn(['data', 'id'])) : null}
                    />
                  </TCell>
                  <TCell
                    primary
                    opacity={toggleEntry ? entry.getIn(['data', 'lastExec', 'done']) * 0.3 : 1.0}
                    lineThrough={toggleEntry ? entry.getIn(['data', 'lastExec', 'done']) : false}
                    onClick={toggleEntry ? () => toggleEntry(entry.getIn(['data', 'id'])) : null}
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