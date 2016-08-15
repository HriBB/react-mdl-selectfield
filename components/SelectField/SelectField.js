import React, { Component, Children, PropTypes } from 'react'
import { Textfield, Menu, Icon } from 'react-mdl'
import classnames from 'classnames'

import './SelectField.scss'

export default class SelectField extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: null,
      inputValue: '',
      focused: false,
    }

    // generate selectfield id
    this.id = `mdl-selectfield-${selectFieldIndex}`
    selectFieldIndex++

    // override material menu if needed
    if (!overrideApplied) applyOverride()

    this.showMenu = this.showMenu.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
    this.onMenuItemClick = this.onMenuItemClick.bind(this)
    this.onTextfieldFocus = this.onTextfieldFocus.bind(this)
    this.onTextfieldBlur = this.onTextfieldBlur.bind(this)
    this.onTextfieldChange = this.onTextfieldChange.bind(this)
    this.onTextfieldKeyDown = this.onTextfieldKeyDown.bind(this)
  }

  componentWillMount() {
    const { value, multiple, children } = this.props
    if (value && !multiple) {
      Children.forEach(children, child => {
        if (child.props.value === value) {
          this.setState({
            value: child.props.value,
            inputValue: child.props.children || '',
          })
        }
      })
    }
  }

  getInputNode() {
    return this.input.refs.input
  }

  getMenu() {
    return this.getMenuNode().MaterialMenu
  }

  getMenuNode() {
    if (!this.menuNode) {
      this.menuNode = document.querySelectorAll(`[data-mdl-for="${this.id}"]`)[0]
    }
    return this.menuNode
  }

  menuVisible() {
    return hasClass(this.getMenuNode().parentNode, 'is-visible')
  }

  showMenu() {
    const menu = this.getMenu()
    if (menuOpenCurrent && menu !== menuOpenCurrent) {
      menuOpenCurrent.hide()
      menuOpenCurrent = null
    }
    if (!this.menuVisible()) {
      menu.show()
      menuOpenCurrent = menu
    }
  }

  hideMenu() {
    this.getMenu().hide()
    menuOpenCurrent = false
  }

  focusMenu() {
    this.getMenu().element_.children[0].focus()
  }

  fixMenuHeight() {
    // TODO: find a better solution or implement boundaries
    const node = this.getMenuNode()
    const box = node.getBoundingClientRect()
    const width = box.width
    const height = box.height > 250 ? 250 : box.height
    node.style.clip = `rect(0 ${width}px ${height}px 0)`
    node.parentNode.style.height = `${height}px`
    node.previousSibling.style.height = `${height}px`
  }

  onMenuItemClick(child) {
    const { multiple } = this.props
    const { value, children } = child.props
    const inputValue = value ? children || '' : ''
    if (multiple || value !== this.state.value) {
      this.setState({ value, inputValue })
      if (this.props.onChange) this.props.onChange(value, inputValue)
    }
    this.hideMenu()
  }

  onTextfieldFocus(e) {
    this.showMenu()
    this.setState({ focused: true })
    if (this.props.onFocus) this.props.onFocus(e)
  }

  onTextfieldBlur(e) {
    this.setState({ focused: false })
    if (this.props.onBlur) this.props.onBlur(e)
  }

  onTextfieldChange(e) {
    const newValue = e.target.value
    this.setState({ value: null, inputValue: newValue }, this.fixMenuHeight)
  }

  onTextfieldKeyDown(e) {
    const TAB = 9
    //const ENTER = 13
    const ESCAPE = 27
    //const DOWN_ARROW = 40

    switch (e.which) {
      case TAB:
        this.hideMenu()
        break
      case ESCAPE:
        this.getInputNode().blur()
        this.hideMenu()
        break
    }
  }

  getChildren() {
    const { editable, skipValues } = this.props
    const { value, inputValue } = this.state
    let children = Children.toArray(this.props.children)
    // needed for multiselect
    if (skipValues.length) {
      children = children.filter(child => skipValues.indexOf(child.props.value) === -1)
      // no more children
      if (!children.length) {
        return [<Option value={''} disabled>No values</Option>]
      }
    }
    // return all
    if (value || !editable || !inputValue) {
      return children
    }
    // filter children
    const re = new RegExp(inputValue, 'gi');
    return children.filter(child => child.props.children.match(re))
  }

  render() {
    const { floatingLabel, className, label, error, multiple, editable } = this.props
    const { value, inputValue, focused } = this.state
    const children = this.getChildren()
    const mainClass = classnames({
      'mdl-selectfield': true,
      'mdl-selectfield--editable': editable,
      'mdl-selectfield--error': error,
    }, className)
    return (
      <div className={mainClass}>
        <Textfield
          id={this.id}
          className={menuSkipForClass}
          floatingLabel={floatingLabel}
          type={'text'}
          label={label}
          error={error}
          value={!multiple ? inputValue : ''}
          readOnly={!editable}
          onFocus={this.onTextfieldFocus}
          onBlur={this.onTextfieldBlur}
          onChange={this.onTextfieldChange}
          onKeyDown={this.onTextfieldKeyDown}
          ref={ref => this.input = ref}
        />
        <Icon
          className={'mdl-selectfield__arrow'}
          name={`arrow_drop_${focused ? 'up' : 'down'}`}
          onClick={this.showMenu}
        />
        <Menu target={this.id} ripple>
          {Children.map(children, child => {
            const className = classnames({
              'mdl-menu__item--selected': !multiple && child.props.value === value,
              'mdl-menu__item--disabled': child.props.disabled,
            })
            return React.cloneElement(child, {
              className,
              onClick: () => this.onMenuItemClick(child),
            })
          })}
        </Menu>
      </div>
    )
  }

}

SelectField.propTypes = {
  className: PropTypes.string,
  floatingLabel: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  multiple: PropTypes.bool,
  editable: PropTypes.bool,
  skipValues: PropTypes.array,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

SelectField.defaultProps = {
  editable: false,
  multiple: false,
  skipValues: [],
}


/**
 * MDL v1 is hard to extend with react ...
 */

/**
 * Increment selectfield id for automatic menu target
 *
 * @type {Number}
 */
let selectFieldIndex = 0

/**
 * Has override been applied
 *
 * @type {Boolean}
 */
let overrideApplied = false

/**
 * Currently open menu
 *
 * @type {Boolean|String}
 */
let menuOpenCurrent = false

/**
 * Skip menu for click class
 *
 * @type {String}
 */
const menuSkipForClass = 'mdl-menu--skip-for-click'

/**
 * Check if element has class
 *
 * @param  {HTMLElement} node
 * @param  {String}  cls
 * @return {Boolean}
 */
function hasClass(node, cls) {
    return (' ' + node.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

/**
 * Override MaterialMenu
 *
 * @see https://github.com/google/material-design-lite/issues/4450#issuecomment-228093633
 */
function applyOverride() {
  overrideApplied = true
  window.MaterialMenu.prototype.handleForClick_ = function(evt) {
    // START OVERRIDE
    if (hasClass(evt.target.parentNode, menuSkipForClass)) {
      evt.stopPropagation()
      evt.preventDefault()
      return false
    }
    // END OVERRIDE
    if (this.element_ && this.forElement_) {
      var rect = this.forElement_.getBoundingClientRect();
      var forRect = this.forElement_.parentElement.getBoundingClientRect();

      if (this.element_.classList.contains(this.CssClasses_.UNALIGNED)) {
        // Do not position the menu automatically. Requires the developer to
        // manually specify position.
      } else if (this.element_.classList.contains(
          this.CssClasses_.BOTTOM_RIGHT)) {
        // Position below the "for" element, aligned to its right.
        this.container_.style.right = (forRect.right - rect.right) + 'px';
        this.container_.style.top =
            this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px';
      } else if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT)) {
        // Position above the "for" element, aligned to its left.
        this.container_.style.left = this.forElement_.offsetLeft + 'px';
        this.container_.style.bottom = (forRect.bottom - rect.top) + 'px';
      } else if (this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
        // Position above the "for" element, aligned to its right.
        this.container_.style.right = (forRect.right - rect.right) + 'px';
        this.container_.style.bottom = (forRect.bottom - rect.top) + 'px';
      } else {
        // Default: position below the "for" element, aligned to its left.
        this.container_.style.left = this.forElement_.offsetLeft + 'px';
        this.container_.style.top =
            this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px';
      }
    }

    this.toggle(evt);
  };
}
