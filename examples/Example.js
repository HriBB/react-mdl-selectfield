import React, { Component } from 'react';

import { Layout, Header, Navigation, Content, Icon } from 'react-mdl'

import { SelectField, MultiSelectField, Option } from '../src';

import './Example.scss';

export default class Example extends Component {
  render() {
    return (
      <Layout fixedHeader>
        <Header title={'React MDL SelectField'}>
          <Navigation>
            <a href="https://github.com/HriBB/react-mdl-selectfield"><Icon name={'link'}/> GitHub</a>
          </Navigation>
        </Header>
        <Content>
          <div className={'example'}>
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
          </div>
        </Content>
      </Layout>
    )
  }
}
