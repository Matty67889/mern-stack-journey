/**
 * @fileoverview Component for taking in text input.
 * 
 * Native HTML input element requires string inputs,
 * so we build special inputs for non-strings.
 */

import React from 'react';

/**
 * Returns the text if it is not null, and an empty string otherwise.
 * 
 * @param {String} text the text
 * @returns text if it is not null, and an empty string otherwise.
 */
function format(text) {
  return text != null ? text : '';
}

/**
 * Returns the text if it is not empty, and `null` otherwise.
 * 
 * @param {String} text the text
 * @returns the text if it is not empty, and `null` otherwise.
 */
function unformat(text) {
  return text.trim().length === 0 ? null : text;
}

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: format(props.value) };
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  onBlur(e) {
    const { onChange } = this.props;
    const { value } = this.state;
    onChange(e, unformat(value));
  }

  render() {
    const { value } = this.state;
    // tag input is optional for text tag to render, whether it
    // be input or textarea
    const { tag = 'input', ...props } = this.props;
    return React.createElement(tag, {
      ...props,
      value,
      onBlur: this.onBlur,
      onChange: this.onChange,
    });
  }
}
