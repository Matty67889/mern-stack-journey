const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// GraphQL imports
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

// GraphQL Nonsense
const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',

  serialize(value) {
    return value.toISOString();
  },

  parseValue(value) {
    return new Date(value);
  },

  parseLiteral(ast) {
    return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined;
  }
});

let aboutMessage = "Issue Tracker API v1.0";

const issuesDB = [
  {
    id: 1, status: "New", owner: "Ravan", effort: 5,
    created: new Date('2018-08-15'), due: undefined,
    title: 'Chicken started running without its head'
  },
  {
    id: 2, status: "Assigned", owner: "Eddie", effort: 14,
    created: new Date('2018-08-16'), due: new Date('2018-08-30'),
    title: "I can't find my fingers"
  },
  {
    id: 3, status: "Assigned", owner: "Tobias", effort: 7,
    created: new Date('2018-08-17'), due: new Date('2018-08-18'),
    title: "Adding another issue to follow the rule of threes"
  }
];

const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList
  },
  Mutation: {
    setAboutMessage,
    issueAdd
  }
}

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

function issueAdd(_, { issue }) {
  issue.created = new Date();
  issue.id = issuesDB.length + 1;
  if (issue.status == undefined) issue.status = 'New';
  issuesDB.push(issue);
  return issue;
}

function issueList() {
  return issuesDB;
}

const app = express();

// Apollo server (testing) setup
const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers
});
server.applyMiddleware({ app, path: '/graphql' });

const fileServerMiddleware = express.static('public');
app.use('/', fileServerMiddleware);
app.listen(3000, function () {
  console.log('App started on port 3000');
});