import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { MultiSelectField, Option } from '../src';

storiesOf('MultiSelectField', module)
  .add('default', () => (
    <MultiSelectField label={'Select me many times'}>
      <Option value={1}>Value One</Option>
      <Option value={2}>Value Two</Option>
      <Option value={3}>Value Three</Option>
      <Option value={4}>Value Four</Option>
      <Option value={5}>Value Five</Option>
    </MultiSelectField>
  ))
  .add('preselected', () => (
    <MultiSelectField label={'Select me many times'} value={[2,4]}>
      <Option value={1}>Value One</Option>
      <Option value={2}>Value Two</Option>
      <Option value={3}>Value Three</Option>
      <Option value={4}>Value Four</Option>
      <Option value={5}>Value Five</Option>
    </MultiSelectField>
  ))
  .add('editable', () => (
    <MultiSelectField label={'Select me many times'} editable>
      <Option value={1}>Value One</Option>
      <Option value={2}>Value Two</Option>
      <Option value={3}>Value Three</Option>
      <Option value={4}>Value Four</Option>
      <Option value={5}>Value Five</Option>
    </MultiSelectField>
  ))
  .add('error', () => (
    <MultiSelectField label={'Select me many times'} error={'Please select some values'}>
      <Option value={1}>Value One</Option>
      <Option value={2}>Value Two</Option>
      <Option value={3}>Value Three</Option>
      <Option value={4}>Value Four</Option>
      <Option value={5}>Value Five</Option>
    </MultiSelectField>
  ));
