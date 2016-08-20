# React-MDL SelectField

> Selectfield component for [React Material Design Lite](https://github.com/tleunen/react-mdl)

## Examples

https://hribb.github.io/react-mdl-selectfield/

## Installation

```
npm install --save react-mdl-selectfield
```

## Usage

```
import { SelectField, Option } from 'react-mdl-selectfield';

render() {
  return() (
    <SelectField label={'Select me'}>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </SelectField>
  );
}
```

NOTE: `<Option>` component requires a string `children` prop for filtering.

```
<SelectField label={'Select me'} editable>
  {users.map(user =>
    <Option key={user.id} value={user.id}>
      {`${user.first_name} ${user.last_name}`}
    </Option>
  )}
</SelectField>
```

## Development

```
cd react-mdl-selectfield/
npm install
npm run storybook
```

## Component boilerplate

Using [react-component-boilerplate](https://github.com/ritz078/react-component-boilerplate)

## TODO

- [ ] Add readOnly to `MultiSelectField`
- [ ] Make both `SelectField` and `MultiSelectField` stateless
