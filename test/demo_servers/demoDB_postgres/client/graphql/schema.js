
const { makeExecutableSchema } = require("graphql-tools");
const typeDefs = require("./schema/typeDefs");

const resolvers = require("./resolvers/resolvers");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;
