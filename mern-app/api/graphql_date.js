/**
 * @fileoverview GraphQL Date type.
 */

// GraphQL imports
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

// GraphQL nonsense
/**
 * Defines a date type in GraphQL.
 */
const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',

  serialize(value) {
    return value.toISOString();
  },

  parseValue(value) {
    const dateValue = new Date(value);
    return Number.isNaN(dateValue.getTime()) ? undefined : dateValue; // check valid date
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      const value = new Date(ast.value);
      return Number.isNaN(value.getTime()) ? undefined : value; // check valid date
    }
    return undefined;
  },
});

module.exports = GraphQLDate;