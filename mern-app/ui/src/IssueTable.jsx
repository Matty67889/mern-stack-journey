
/**
 * @fileoverview Components related to creating a table of issues.
 */

import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger,
} from 'react-bootstrap';

/**
 * Returns an element representing an issue in a table row given
 * an issue to display.
 *
 * @param {Object} issue the issue to display in the row
 * @returns an element representing an issue in a table row
 */
const IssueRow = withRouter(({
  issue, location: { search }, closeIssue, deleteIssue, index
}) => {
  const selectLocation = { pathname: `/issues/${issue.id}`, search };
  const closeTooltip = (
    <Tooltip id="close-tooltip" placement="top">Close Issue</Tooltip>
  );
  const deleteTooltip = (
    <Tooltip id="delete-tooltip" placement="top">Delete Issue</Tooltip>
  );
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.due ? issue.due.toDateString() : ' '}</td>
      <td>{issue.title}</td>
      <td>
        <Link to={`/edit/${issue.id}`}>Edit</Link>
        {' | '}
        <NavLink to={selectLocation}>Show Description</NavLink>
        {' | '}
        <OverlayTrigger delayShow={1000} overlay={closeTooltip}>
          <Button bsSize="xsmall" onClick={() => { closeIssue(index); }}>
            <Glyphicon glyph="remove" />
          </Button>
        </OverlayTrigger>
        {' | '}
        <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
          <Button bsSize="xsmall" onClick={() => { deleteIssue(index); }}>
            <Glyphicon glyph="trash" />
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );
});

/**
 * Returns an element representing a table of issues given
 * a list of issues to display.
 *
 * @param {Object} issues a JSON object representing the list of issues.
 * @returns an element representing a table of issues.
 */
export default function IssueTable({ issues, closeIssue, deleteIssue }) {
  const issueRows = issues.map((issue, index) => (
    <IssueRow
      key={issue.id}
      issue={issue}
      closeIssue={closeIssue}
      deleteIssue={deleteIssue}
      index={index}
    />
  ));
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Due Date</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </table>
  );
}
