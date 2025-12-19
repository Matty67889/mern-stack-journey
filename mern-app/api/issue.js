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
 * Returns a list of all issues in the database.
 * 
 * @returns a list of all issues in the database.
 */
async function list() {
  const db = getDb();

  const issues = await db.collection('issues').find({}).toArray();
  return issues;
}

/**
 * Adds an issue to the database.
 * 
 * @param {*} _ 
 * @param {*} param1 
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