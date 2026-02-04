/**
 * @fileoverview Module for GraphQL fetch code.
 */

const dateRegex = new RegExp("^\\d\\d\\d\\d-\\d\\d-\\d\\d");

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

/**
 * Queries database with GraphQL.
 *
 * @param {String} query the query for the backend
 * @param {Object} variables the variables for the query
 * @param {function} showError callback function for showing errors
 * @return the data that matches the criteria in the query, and null otherwise
 */
export default async function graphQLFetch(
  query,
  variables = {},
  showError = null,
) {
  try {
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    }); // response is returned as JSON
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code === "BAD_USER_INPUT") {
        const details = error.extensions.exception.errors.join("\n ");
        if (showError) {
          showError(`${error.message}:\n ${details}`);
        }
      } else if (showError) {
        showError(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    if (showError) showError(`Error in sending data to server: ${e.message}`);
    return null;
  }
}
