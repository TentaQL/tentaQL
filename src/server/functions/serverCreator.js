function serverCreator() {
  const index = `
  
  const express = require("express");
  const expressGraphQL = require("express-graphql");
  const bodyParser = require("body-parser");
  const cors = require("cors");

  const schema = require("./graphql/schema");
  const app = express();


  app.use("/graphql", expressGraphQL({ schema, graphiql: true }));
  app.use(cors(), bodyParser.json());
  
  app.listen(8080, () => {
    console.log('Server running  on port 8080');
  });

  `;
  return index;
}
module.exports = serverCreator;
