/**
 * @fileoverview Issue related functions.
 */

const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require("./db.js");

/**
 * Validates that an issue is properly formatted.
 * 
 * @param {Object} issue the issue to test
 */
function validate(issue) {
  const errors = [];
  if (issue.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters long');
  }

  if (issue.status === 'Assigned' && !issue.owner) {
    errors.push('Field "owner" is required when status is "Assigned"');
  }

  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

/**
 * Returns a list of issues in the database that match the provided filter.
 * 
 * @param {Object} status the status of issues to display
 * @returns a list of all issues in the database that match the provided filter.
 */
async function list(_, { status }) {
  const db = getDb();
  const filter = {};

  if (status) filter.status = status;

  const issues = await db.collection('issues').find(filter).toArray();
  return issues;
}

/**
 * Adds an issue to the database.
 * 
 * @param {*} _ 
 * @param {Object} issue the issue details for the issue to add 
 * @returns the issue that was added to the database.
 */
async function add(_, { issue }) {
  const db = getDb();

  validate(issue);
  const newIssue = Object.assign({}, issue);
  newIssue.created = new Date();
  newIssue.id = await getNextSequence('issues');
  const result = await db.collection('issues').insertOne(newIssue);
  const addedIssue = await db.collection('issues')
    .findOne({ _id: result.insertedId });
  return addedIssue;
}

module.exports = { list, add }