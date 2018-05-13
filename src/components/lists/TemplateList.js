import React from 'react';
import TCell from '../table/TCell';
import CBButton from '../buttons/CBButton';
import OButton from '../buttons/OButton';

const TemplateList = ({templates, edit}) => {
  return templates.map((template, index) => {
    let summ = template.getIn(['data', 'summ']);
    let id = template.get('id');
    return (
      <tr key={index}>
        <TCell><CBButton vertical={false} /></TCell>
        <TCell primary lineThrough={false}>{summ}</TCell>
        <TCell><OButton onClick={() => {edit(id, true)}} /></TCell>
      </tr>
    );
  });
}

export default TemplateList;