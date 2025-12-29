
/**
 * @fileoverview Component for editing issues.
 */

import React from 'react';

/**
 * Returns a component representing a form for editing issues.
 * 
 * @param {Object} match the match object of the router component
 * @returns an element representing a form for editing issues.
 */
export default function IssueEdit({ match }) {
  const { id } = match.params;
  return (
    <h2>{`Placeholder for editing issue ${id}`}</h2>
  );
}
