/**
 * @fileoverview Database functions.
 */

require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

/**
 * Returns the database instnace.
 * 
 * @returns the database instance
 */
function getDb() {
  return db;
}

/**
 * Connects to Mongo database.
 */
async function connectToDb() {
  const url = process.env.DB_URL || 'mongodb://localhost/issuetracker';
  const client = new MongoClient(url);
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

/**
 * Gets the next id for the collection with the name `name`.
 * 
 * @param {string} name the name of the collection to get the next id from.
 * @returns the next id for the colection
 */
async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnDocument: 'after' },
  );

  return result.value.current;
}

module.exports = { getDb, connectToDb, getNextSequence }