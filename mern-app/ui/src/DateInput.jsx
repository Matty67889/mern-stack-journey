/**
 * @fileoverview Component for taking in date inputs.
 *
 * Native HTML input element requires string inputs,
 * so we build special inputs for non-strings.
 *
 * The validity of a date has to be determined when
 * the user finishes typing the date, so this component
 * uses the `onBlur()` property to decide when to check for validity.
 */

import React from 'react';

/**
 * Returns a date as a string, and an empty string if it can't be converted.
 *
 * This is used for displaying the date.
 *
 * @param {Object} date the date
 * @returns `date` as a string, or `''` if it can't be converted.
 */
function displayFormat(date) {
  return (date != null) ? date.toDateString() : '';
}

/**
 * Returns a date as a ISO String.
 *
 * This is used for forcing the user to edit the date in a `YYYY-MM-DD` format.
 *
 * @param {Object} date the date
 * @returns `date` as an ISO string, or `''` if it can't be converted.
 */
function editFormat(date) {
  return (date != null) ? date.toISOString().substr(0, 10) : '';
}

/**
 * Returns a string as a date, and null if the string can't be converted.
 *
 * @param {string} str the string
 * @returns `str` as a date, or null if it can't be converted.
 */
function unformat(str) {
  const val = new Date(str);
  return Number.isNaN(val.getTime()) ? null : val;
}

/**
 * Returns a component representing an input for numbers.
 */
export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: editFormat(props.value),
      focused: false,
      valid: true,
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFocus() {
    this.setState({ focused: true });
  }

  /**
   * Updates the state of the component if the event value is a
   * digit or a dash (-).
   *
   * @param {Object} e the event
   */
  onChange(e) {
    if (e.target.value.match(/^[\d-]*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  /**
   * Checks for date validity when the input loses focus.
   *
   * @param {Object} e the event
   */
  onBlur(e) {
    const { value, valid: oldValid } = this.state;
    const { onValidityChange, onChange } = this.props;
    const dateValue = unformat(value);
    const valid = value === '' || dateValue != null;
    // if validity changes, call the onValidity change function
    if (valid !== oldValid && onValidityChange) {
      onValidityChange(e, valid);
    }
    this.setState({ focused: false, valid });
    if (valid) onChange(e, dateValue);
  }

  render() {
    const { valid, focused, value } = this.state;
    const { value: origValue, onValidityChange, ...props } = this.props;
    const displayValue = (focused || !valid) ? value
      : displayFormat(origValue);
    return (
      <input
        type="text"
        {...props}
        value={displayValue}
        placeholder={focused ? 'yyyy-mm-dd' : null}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    );
  }
}
