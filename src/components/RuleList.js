import React from 'react';

import {Table, TCell} from '../sc/table';
import {CBButton, PlusButton, OButton} from '../sc/buttons';
import {Input} from '../sc/inputs';
import {Section, Subsection} from '../sc/container';
import {Header} from '../sc/texts';
import { ACCENT_COLOR } from '../utils/constants';

const EntryList = ({
  entries,
  fastInputObj,
  editEntry,
  fastInputUpdater,
  fastAddEntry
}) => (
  <Section>
    <Header>Regeln</Header>
    <Subsection>
      <Table>
        <tbody>
          {entries.map((entry, index) => {
            return (
              <tr key={index}>
                <TCell>
                  <CBButton
                    size='16px'
                    color={ACCENT_COLOR}
                  />
                </TCell>
                <TCell
                  primary
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
      </Table>
    </Subsection>
  </Section>
);

export default EntryList;