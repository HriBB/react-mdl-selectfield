import React from 'react';
import ReactDOM from 'react-dom';

import {
  SelectField,
  MultiSelectField,
  Option
} from '../components';

ReactDOM.render(
  <div>
    <SelectField label={'Default'}>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </SelectField>
    <SelectField label={'Editable'} editable>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </SelectField>
    <MultiSelectField label={'Multiselect'}>
      <Option value={1}>Value One</Option>
      <Option value={2}>Value Two</Option>
      <Option value={3}>Value Three</Option>
      <Option value={4}>Value Four</Option>
      <Option value={5}>Value Five</Option>
    </MultiSelectField>
  </div>,
  document.getElementById('content'));
