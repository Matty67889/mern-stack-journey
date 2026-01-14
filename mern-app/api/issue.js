/**
 * @fileoverview Functions for interacting with the issue database.
 */

const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require("./db.js");

/**
 * Validates that an issue is properly formatted.
 * 
 * An issue is properly formatted if:
 * - the length of the title is more than 3 characters long
 * - the issue has an owner when the status is set to "Assigned"
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
 * Returns the issue with the provided id.
 * 
 * @param {*} _ 
 * @param {Object} id the id of the issue 
 * @returns the issue with the provided id
 */
async function get(_, { id }) {
  const db = getDb();
  const issue = await db.collection('issues').findOne({ id });
  return issue;
}

/**
 * Returns a list of issues in the database that match the provided filter.
 * 
 * @param {Object} status the status of issues to display
 * @returns a list of all issues in the database that match the provided filter.
 */
async function list(_, { status, effortMin, effortMax }) {
  const db = getDb();
  const filter = {};

  if (status) filter.status = status;

  if (effortMin !== undefined || effortMax !== undefined) {
    filter.effort = {};
    if (effortMin !== undefined) filter.effort.$gte = effortMin;
    if (effortMax !== undefined) filter.effort.$lte = effortMax;
  }

  const issues = await db.collection('issues').find(filter).toArray();
  return issues;
}

/**
 * Adds an issue to the database, and returns the added issue.
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

/**
 * Updates an existing issue in the database and returns the updated issue.
 * 
 * @param {*} _ 
 * @param {Object} param1 the id and the changes 
 * @returns the issue that was saved to the database.
 */
async function update(_, { id, changes }) {
  const db = getDb();
  if (changes.title || changes.status || changes.owner) {
    const issue = await db.collection('issues').findOne({ id });
    Object.assign(issue, changes);
    validate(issue);
  }
  await db.collection('issues').updateOne({ id }, { $set: changes });
  const savedIssue = await db.collection('issues').findOne({ id });
  return savedIssue;
}

/**
 * Attempts to delete an issue from the database, and
 * returns true if the deletion was successful, and false otherwise.
 * 
 * Deleting an entry from the database saves it into
 * another database for deleted issues (`'deleted_issues'`),
 * and removes it from the main database.
 * 
 * @param {Object} id the id of the issue to remove.
 * @returns `true` if the deletion was successful, `false` otherwise
 */
async function remove(_, { id }) {
  const db = getDb();
  const issue = await db.collection('issues').findOne({ id });
  if (!issue) return false;
  issue.deleted = new Date();

  let result = await db.collection('deleted_issues').insertOne(issue);
  if (result.insertedId) {
    result = await db.collection('issues').removeOne({ id });
    return result.deletedCount === 1;
  }
  return false;
}

module.exports = { list, add, get, update, delete: remove }