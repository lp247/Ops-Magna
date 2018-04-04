import React from 'react';
import {TCell} from '../sc/table';
import {CBButton, OButton} from '../sc/buttons';

const TemplateList = ({templates, edit}) => {
  return templates.map((template, index) => {
    let summ = template.getIn(['data', 'summ']);
    let id = template.get('id');
    return (
      <tr key={index}>
        <TCell><CBButton size='16px' vertical={false} /></TCell>
        <TCell primary lineThrough={false}>{summ}</TCell>
        <TCell><OButton size='16px' onClick={() => {edit(id, true)}} /></TCell>
      </tr>
    );
  });
}

export default TemplateList;