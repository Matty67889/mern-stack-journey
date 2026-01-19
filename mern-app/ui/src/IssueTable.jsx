
/**
 * @fileoverview Components related to creating a table of issues.
 */

import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger, Table,
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
  const editTooltip = (
    <Tooltip id="edit-tooltip" placement="top">Edit Issue</Tooltip>
  );
  const closeTooltip = (
    <Tooltip id="close-tooltip" placement="top">Close Issue</Tooltip>
  );
  const deleteTooltip = (
    <Tooltip id="delete-tooltip" placement="top">Delete Issue</Tooltip>
  );

  // onClose and onDelete needed to prevent row from being selected
  // when button is clicked
  function onClose(e) {
    e.preventDefault();
    closeIssue(index);
  }

  function onDelete(e) {
    e.preventDefault();
    deleteIssue(index);
  }

  const tableRow = (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.due ? issue.due.toDateString() : ' '}</td>
      <td>{issue.title}</td>
      <td>
        <LinkContainer to={`/edit/${issue.id}`}>
          <OverlayTrigger delayShow={1000} overlay={editTooltip}>
            <Button bsSize="xsmall">
              <Glyphicon glyph="edit" />
            </Button>
          </OverlayTrigger>
        </LinkContainer>
        {' '}
        <OverlayTrigger delayShow={1000} overlay={closeTooltip}>
          <Button bsSize="xsmall" onClick={onClose}>
            <Glyphicon glyph="remove" />
          </Button>
        </OverlayTrigger>
        {' '}
        <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
          <Button bsSize="xsmall" onClick={onDelete}>
            <Glyphicon glyph="trash" />
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );

  return (
    <LinkContainer to={selectLocation}>
      {tableRow}
    </LinkContainer>
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
    <Table bordered condensed hover responsive
      className="bordered-table">
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
    </Table>
  );
}
