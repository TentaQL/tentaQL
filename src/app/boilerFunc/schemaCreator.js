function schemaCreator() {
  const schema = `
const makeExecutableSchema = require("graphql-tools");
const typeDefs = require("./schema/schema");
const resolvers = require("./resolvers/resolvers");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;
`;
  return schema;
}

module.exports = schemaCreator;
