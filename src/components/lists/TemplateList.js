import React from 'react';
import {List} from 'immutable';
import CBButton from '../buttons/CBButton';
import OButton from '../buttons/OButton';
import BasicSpan from '../texts/BasicSpan';

const TemplateList = ({templates, edit}) => {
  return templates.reduce((accu, template, index) => {
    let summ = template.getIn(['data', 'summ']);
    let id = template.get('id');
    return accu.push(
      <CBButton key={(index * 3 + 1).toString()} vertical={false} />,
      <BasicSpan key={(index * 3 + 2).toString()} lineThrough={false}>{summ}</BasicSpan>,
      <OButton key={(index * 3 + 3).toString()} onClick={() => {edit(id, true)}} />
    );
  }, List());
}

export default TemplateList;