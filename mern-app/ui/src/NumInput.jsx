/**
 * @fileoverview Component for taking in number inputs.
 * 
 * Native input element requires string inputs,
 * so we build special inputs for non-strings.
 */

import React from 'react';

/**
 * Returns a number as a string, and an empty string if it can't be converted.
 * 
 * @param {number} num the number
 * @returns `num` as a string, or `''` if it can't be converted.
 */
function format(num) {
  return num != null ? num.toString() : '';
}

/**
 * Returns a string as a number, and null if the string can't be converted.
 * 
 * @param {string} str the string
 * @returns `str` as a number, or null if it can't be converted.
 */
function unformat(str) {
  const val = parseInt(str, 10);
  return Number.isNaN(val) ? null : val;
}

/**
 * Returns a component representing an input for numbers.
 */
export default class NumInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: format(props.value) };
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Updates the state of the component if the event value is a digit.
   * 
   * @param {Object} e the event
   */
  onChange(e) {
    if (e.target.value.match(/^\d*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  /**
   * Passes the value as a number to the parent to handle
   * the onChange event when the input loses focus.
   * 
   * @param {Object} e the event
   */
  onBlur(e) {
    const { onChange } = this.props;
    const { value } = this.state;
    onChange(e, unformat(value));
  }

  render() {
    const { value } = this.state;
    return (
      <input
        type="text"
        {...this.props}
        value={value}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    );
  }
}
