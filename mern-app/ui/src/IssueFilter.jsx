
/**
 * @fileoverview IssueFilter component.
 */

/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { ButtonToolbar, Button, FormGroup, FormControl,
  ControlLabel, InputGroup,
} from 'react-bootstrap';

/**
 * Returns a component representing a filter for issues.
 *
 * @returns an element representing a filter for issues.
 */
class IssueFilter extends React.Component {
  constructor({ location: { search } }) {
    super();
    const params = new URLSearchParams(search);
    this.state = {
      status: params.get('status') || '',
      effortMin: params.get('effortMin') || '',
      effortMax: params.get('effortMax') || '',
      changed: false,
    };
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.showOriginalFilter = this.showOriginalFilter.bind(this);
    this.onChangeEffortMin = this.onChangeEffortMin.bind(this);
    this.onChangeEffortMax = this.onChangeEffortMax.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.showOriginalFilter();
    }
  }

  /**
   * Updates the state of the filter when the status changes.
   *
   * @param {Object} e the event
   */
  onChangeStatus(e) {
    this.setState({
      status: e.target.value,
      changed: true,
    });
  }

  /**
   * Updates the state of the filter when the minimum effort changes.
   *
   * @param {Object} e the event
   */
  onChangeEffortMin(e) {
    const effortString = e.target.value;
    // only update state if there are digits
    if (effortString.match(/^\d*$/)) {
      this.setState({
        effortMin: e.target.value,
        changed: true,
      });
    }
  }

  /**
   * Updates the state of the filter when the maximum effort changes.
   *
   * @param {Object} e the event
   */
  onChangeEffortMax(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({
        effortMax: e.target.value,
        changed: true,
      });
    }
  }

  /**
   * Applies the default filter.
   */
  showOriginalFilter() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    this.setState({
      status: params.get('status') || '',
      effortMin: params.get('effortMin') || '',
      effortMax: params.get('effortMax') || '',
      changed: false,
    });
  }

  /**
   * Applies the filter currently selected filter.
   */
  applyFilter() {
    const { status, effortMin, effortMax } = this.state;
    const { history } = this.props;

    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (effortMin) params.set('effortMin', effortMin);
    if (effortMax) params.set('effortMax', effortMax);

    const search = params.toString() ? `?${params.toString()}` : '';
    history.push({ pathname: '/issues', search });
  }

  render() {
    const { status, changed } = this.state;
    const { effortMin, effortMax } = this.state;
    return (
      <div>
        <FormGroup>
          <ControlLabel>Status:</ControlLabel>
          <FormControl
            componentClass="select"
            value={status}
            onChange={this.onChangeStatus}
          >
            <option value="">(All)</option>
            <option value="New">New</option>
            <option value="Assigned">Assigned</option>
            <option value="Fixed">Fixed</option>
            <option value="Closed">Closed</option>
          </FormControl>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Effort between:</ControlLabel>
          <InputGroup>
            <FormControl value={effortMin} onChange={this.onChangeEffortMin} />
            <InputGroup.Addon>-</InputGroup.Addon>
            <FormControl value={effortMax} onChange={this.onChangeEffortMax} />
          </InputGroup>
        </FormGroup>
        {' '}
        <ButtonToolbar>
          <Button bsStyle="primary" type="button" onClick={this.applyFilter}>
            Apply
          </Button>
          <Button
            type="button"
            onClick={this.showOriginalFilter}
            disabled={!changed}
          >
            Reset
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

// `withRouter` allows IssueFilter to have access to the router
// object and properties
export default withRouter(IssueFilter);
