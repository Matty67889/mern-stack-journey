
/**
 * @fileoverview IssueFilter component.
 */

/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';
import { withRouter } from 'react-router-dom';

/**
 * Returns a component representing a filter for issues.
 * 
 * @returns an element representing a filter for issues.
 */
class IssueFilter extends React.Component {
  constructor() {
    super();
    this.onChangeStatus = this.onChangeStatus.bind(this);
  }

  onChangeStatus(e) {
    const status = e.target.value;
    // this prop is available due to `withRouter` function
    const { history } = this.props;
    // changing link will trigger reload of data
    history.push({
      pathname: '/issues',
      search: status ? `?status=${status}` : '',
    });
  }

  render() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    return (
      <div>
        Status:
        {' '}
        <select value={params.get('status') || ''} onChange={this.onChangeStatus}>
          <option value="">(All)</option>
          <option value="New">New</option>
          <option value="Assigned">Assigned</option>
          <option value="Fixed">Fixed</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
    );
  }
}

// `withRouter` allows IssueFilter to have access to the router
// object and properties
export default withRouter(IssueFilter);
