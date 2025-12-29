
/**
 * @fileoverview Components related to creating a table of issues.
 */

import React from 'react';

/**
 * Returns an element representing an issue in a table row given
 * an issue to display.
 * 
 * @param {Object} issue the issue to display in the row 
 * @returns an element representing an issue in a table row
 */
function IssueRow({ issue }) {
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.due ? issue.due.toDateString() : ' '}</td>
      <td>{issue.title}</td>
      <td><a href={`/#/edit/${issue.id}`}>Edit</a></td>
    </tr>
  );
}

/**
 * Returns an element representing a table of issues given
 * a list of issues to display.
 * 
 * @param {Object} issues a JSON object representing the list of issues.
 * @returns an element representing a table of issues.
 */
export default function IssueTable({ issues }) {
  const issueRows = issues.map(issue => (
    <IssueRow key={issue.id} issue={issue} />
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
