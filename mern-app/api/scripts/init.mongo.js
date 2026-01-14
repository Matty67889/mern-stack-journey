/**
 * @fileoverview Database initialization script.
 */

/*
* Run using the mongo shell. For remote databases, ensure that the
* connection string is supplied in the command line. For example:
* localhost:
* mongo issuetracker scripts/init.mongo.js
* Atlas:
* mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker
  scripts/init.mongo.js
*/

/* global db print */
/* eslint no-restricted-globals: "off" */
db.issues.remove({});
db.deleted_issues.remove({});

const issuesDB = [
  {
    id: 1,
    status: 'New',
    owner: 'Ravan',
    effort: 5,
    created: new Date('2018-08-15'),
    due: undefined,
    title: 'Chicken started running without its head',
    description: 'Steps to recreate the problem:'
      + '\n1. Refresh the browser.'
      + '\n2. Select "New" in the filter'
      + '\n3. Refresh the browser again. Note the warning in the console:'
      + '\n   Warning: Hash history cannot PUSH the same path; a new entry'
      + '\n   will not be added to the history stack'
      + '\n4. Click on Add.'
      + '\n5. There is an error in console, and add doesn\'t work.',
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    effort: 14,
    created: new Date('2018-08-16'),
    due: new Date('2018-08-30'),
    title: "I can't find my fingers",
    description: 'Attempting to find fingers results in not finding them',
  },
  {
    id: 3,
    status: 'Assigned',
    owner: 'Tobias',
    effort: 7,
    created: new Date('2018-08-17'),
    due: new Date('2018-08-18'),
    title: 'Adding another issue to follow the rule of threes',
    description: 'There needs to be a border in the bottom in the panel'
      + ' that appears when clicking on Add',
  },
];

// create issues collection
db.issues.deleteMany({});

db.issues.insertMany(issuesDB);
const count = db.issues.countDocuments();
print('Inserted', count, 'issues');

// create counter collection
db.counters.deleteMany({ _id: 'issues' });
db.counters.insertOne({ _id: 'issues', current: count });

db.issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });

// create deleted issues collection
db.deleted_issues.createIndex({ id: 1 }, { unique: true });

