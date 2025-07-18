const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
// GraphQL imports
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

// MongoDB nonsense
const url = "mongodb://localhost/issuetracker";
let db;

// GraphQL nonsense
const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',

  serialize(value) {
    return value.toISOString();
  },

  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue; // check valid date
  },

  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value; // check valid date
    }
  }
});

let aboutMessage = "Issue Tracker API v1.0";

const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList
  },
  Mutation: {
    setAboutMessage,
    issueAdd
  },
  GraphQLDate,
}

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnDocument: 'after' },
  );

  return result.value.current;
}

async function issueAdd(_, { issue }) {
  validateIssue(issue);
  issue.created = new Date()
  issue.id = await getNextSequence('issues');
  const result = await db.collection('issues').insertOne(issue);
  const addedIssue = await db.collection('issues')
    .findOne({ _id: result.insertedId });
  return addedIssue;
}

async function issueList() {
  const issues = await db.collection('issues').find({}).toArray();
  return issues;
}

function validateIssue(issue) {
  const errors = [];
  if (issue.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters long');
  }

  if (issue.status == 'Assigned' && !issue.owner) {
    errors.push('Field "owner" is required when status is "Assigned"');
  }

  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function connectToDb() {
  const client = new MongoClient(url);
  await client.connect();
  console.log("Connected to MongoDB at", url);
  db = client.db();
}

// Apollo server (testing) setup
const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});

const app = express();
const fileServerMiddleware = express.static('public');
app.use('/', fileServerMiddleware);

server.applyMiddleware({ app, path: '/graphql' });

(async function () {
  try {
    await connectToDb();
    app.listen(3000, function () {
      console.log('App started on port 3000');
    });
  } catch (err) {
    console.log("We have an error, just for you:", err);
  }
})();