/**
 * @fileoverview IssueList component.
 */

import React from 'react';
import { Route } from 'react-router-dom';
import { Panel } from 'react-bootstrap';

import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
import IssueDetail from './IssueDetail.jsx';
import graphQLFetch from './graphQLFetch.js';
import Toast from './Toast.jsx';

/**
 * Returns an element that represents an issue tracker.
 */
export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: [],
      toastVisible: false,
      toastMessage: '',
      toastType: 'info',
    };
    this.createIssue = this.createIssue.bind(this); // bind() necessary bc arrow
    // function scope in IssueAdd
    this.closeIssue = this.closeIssue.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    // updates filter when necessary by comparing previous
    // search to current search to see when the query parameters update
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.loadData();
    }
  }

  showSuccess(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'success',
    });
  }

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }


  /**
   * Loads data from database, and updates the state of
   * the issue list with the data.
   */
  async loadData() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);

    const vars = {};
    if (params.get('status')) vars.status = params.get('status');

    const effortMin = parseInt(params.get('effortMin'), 10);
    if (!Number.isNaN(effortMin)) vars.effortMin = effortMin;
    const effortMax = parseInt(params.get('effortMax'), 10);
    if (!Number.isNaN(effortMax)) vars.effortMax = effortMax;

    const query = `query issueList(
      $status: StatusType
      $effortMin: Int
      $effortMax: Int
    ) {
      issueList(
        status: $status
        effortMin: $effortMin
        effortMax: $effortMax
      ) {
        id title status owner created effort due
      }
    }`;
    const data = await graphQLFetch(query, vars, this.showError);
    if (data) {
      this.setState({ issues: data.issueList });
    }
  }

  /**
   * Creates an issue from the provided issue details.
   *
   * The issues details must match the structure that the
   * graphQL schema expects.
   *
   * @param {Object} issue details for the issue.
   */
  async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { issue }, this.showError);
    if (data) {
      this.loadData();
    }
  }

  /**
   * Sets the status of the issue in the issues list in `this.state`
   * to "Closed".
   *
   * @param {number} index the index of the issue in the issues list
   */
  async closeIssue(index) {
    const query =
      `mutation issueClose($id: Int!) {
        issueUpdate(id: $id, changes: { status: Closed }) {
          id title status owner
          effort created due description
        }
      }`;
    const { issues } = this.state;
    const data = await graphQLFetch(query, { id: issues[index].id },
      this.showError);
    if (data) {
      this.setState((prevState) => {
        const newIssuesList = [...prevState.issues];
        newIssuesList[index] = data.issueUpdate;
        return { issues: newIssuesList };
      });
    } else {
      this.loadData();
    }
  }

  /**
   * Deletes an issue.
   *
   * @param {number} index the index of the issue to delete
   */
  async deleteIssue(index) {
    const query = `mutation issueDelete($id: Int!) {
      issueDelete(id: $id)
    }`;
    const { issues } = this.state;
    const { location: { pathname, search }, history } = this.props;
    const { id } = issues[index];
    const data = await graphQLFetch(query, { id }, this.showError);
    if (data && data.issueDelete) {
      this.setState((prevState) => {
        const newIssuesList = [...prevState.issues];
        if (pathname === `/issues/${id}`) {
          history.push({ pathname: '/issues', search });
        }
        newIssuesList.splice(index, 1);
        return { issues: newIssuesList };
      });
      this.showSuccess(`Deleted issue with id ${id} successfully.`);
    } else {
      this.loadData();
    }
  }

  render() {
    const { issues } = this.state;
    const { toastVisible, toastMessage, toastType } = this.state;
    const { match } = this.props;
    return (
      <React.Fragment>
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>Filter</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <IssueFilter />
          </Panel.Body>
        </Panel>
        <IssueTable
          issues={issues}
          closeIssue={this.closeIssue}
          deleteIssue={this.deleteIssue}
        />
        <IssueAdd createIssue={this.createIssue} />
        <Route path={`${match.path}/:id`} component={IssueDetail} />
        <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          bsStyle={toastType}
        >
          {toastMessage}
        </Toast>
      </React.Fragment>
    );
  }
}
