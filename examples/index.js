import React from 'react';
import ReactDOM from 'react-dom';

import 'react-mdl/extra/material.js';
import 'react-mdl/extra/material.css';
import './index.scss';

import {
  SelectField,
  MultiSelectField,
  Option
} from '../components';

ReactDOM.render(
  <div className="example">
    <h1>React MDL Selectfield Component</h1>
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