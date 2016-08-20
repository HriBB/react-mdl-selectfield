import React, { Component, Children, PropTypes } from 'react'
import { Button, Icon } from 'react-mdl'
import classnames from 'classnames'

import './MultiSelectField.scss'

import SelectField from '../SelectField/SelectField'

export default class MultiSelectField extends Component {

  static propTypes = {
    className: PropTypes.string,
    floatingLabel: PropTypes.bool,
    label: PropTypes.string.isRequired,
    value: PropTypes.array,
    editable: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
  }

  static defaultProps = {
    value: [],
  }


  constructor(props) {
    super(props)
    this.state = {
      value: [],
      tags: [],
    }
    this.onSelectChange = this.onSelectChange.bind(this)
    this.onTagClick = this.onTagClick.bind(this)
  }

  componentWillMount() {
    const { value, children } = this.props
    if (value.length) {
      let tags = []
      Children.forEach(children, child => {
        if (value.indexOf(child.props.value) > -1) {
          tags.push({
            value: child.props.value,
            text: child.props.children,
          })
        }
      })
      this.setState({ value, tags })
    }
  }

  onSelectChange(val, text) {
    const { value, tags } = this.state
    if (value.indexOf(val) === -1) {
      const newValue = value.concat([val])
      this.setState({
        value: newValue,
        tags: tags.concat([{ value: val, text }]),
      })
      if (this.props.onChange) this.props.onChange(newValue)
    }
  }

  onTagClick(val) {
    const { value, tags } = this.state
    const newValue = value.filter(v => v !== val)
    this.setState({
      value: newValue,
      tags: tags.filter(t => t.value !== val),
    })
    if (this.props.onChange) this.props.onChange(newValue)
  }

  render() {
    const {
      floatingLabel, className, label, editable, error,
      onFocus, onBlur, children,
    } = this.props
    const { value, tags } = this.state
    const mainClass = classnames('mdl-multiselectfield', className)
    return (
      <div className={mainClass}>
        <SelectField
          floatingLabel={floatingLabel}
          label={label}
          multiple
          error={error}
          editable={editable}
          skipValues={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={this.onSelectChange}
        >
          {children}
        </SelectField>
        <div className={'mdl-taglist'}>
          {tags.map(tag =>
            <Button key={tag.value} raised onClick={() => this.onTagClick(tag.value)}>
              {tag.text}
              <Icon name={'clear'}/>
            </Button>
          )}
        </div>
      </div>
    )
  }

}
