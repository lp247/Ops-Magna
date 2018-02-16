import React from 'react';
import moment from 'moment';
import autosize from 'autosize';
// import PropTypes from 'prop-types';
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
  fastInputText,
  fastInputUpdater,
  fastAddEntry,
  newEntry
}) => (
  <Section>
    <Header>{header}</Header>
    <Subsection>
      <Table>
        <tbody>
          {entries.map((entry, index) => {
            return (
              <tr key={index}>
                <TCell>
                <CBButton
                  size='16px'
                  vertical={toggleEntry ? entry.get('data').get('doneAt').has(moment().format('YYYY-MM-DD')) : false}
                  inactive={!toggleEntry}
                  onClick={toggleEntry ? () => toggleEntry(entry.get('data').get('id')) : null}
                />
                </TCell>
                <TCell
                  primary
                  opaque={toggleEntry ? entry.get('data').get('doneAt').has(moment().format('YYYY-MM-DD')) : false}
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
                onClick={() => {fastAddEntry(fastInputText)}}
              />
            </TCell>
            <TCell primary padding='0px 10px'>
              <Input
                type='textarea'
                value={fastInputText}
                onChange={(e) => {
                  autosize(e.target.value);
                  fastInputUpdater(e);
                }}
              />
            </TCell>
            <TCell>
              <OButton
                size='16px'
                onClick={() => {newEntry(fastInputText)}}
              />
            </TCell>
          </tr>
        </tbody>
      </Table>
    </Subsection>
  </Section>
);

// List.propTypes = {
//   entries: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       summ: PropTypes.string.isRequired,
//       desc: PropTypes.string,
//       single: PropTypes.bool.isRequired,
//       months: PropTypes.arrayOf(PropTypes.number).isRequired,
//       weeks: PropTypes.arrayOf(PropTypes.number).isRequired,
//       days: PropTypes.arrayOf(PropTypes.number).isRequired,
//       time: PropTypes.string.isRequired,
//       start: PropTypes.string.isRequired,
//       end: PropTypes.string.isRequired
//     }).isRequired
//   ).isRequired,
//   togglable: PropTypes.bool.isRequired,
//   toggleEntry: PropTypes.func,
//   edit: PropTypes.func.isRequired
// };

export default EntryList;