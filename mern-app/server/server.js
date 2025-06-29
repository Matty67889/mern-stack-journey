const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

// GraphQL Nonsense
let aboutMessage = "Issue Tracker API v1.0";

const resolvers = {
  Query: {
    about: () => aboutMessage,
  },
  Mutation: {
    setAboutMessage
  },
}

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
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