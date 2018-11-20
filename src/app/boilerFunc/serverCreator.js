function serverCreator() {
  const index = `
  
  const express = require("express");
  
  const PORT = "7000";
  const expressGraphQL = require("express-graphql");
  const bodyParser = require("body-parser");
  const cors = require("cors");


  const schema = require("./client/graphql/schema");
  const app = express();


  app.use("/graphql", expressGraphQL({ schema, graphiql: true }));
  app.use(cors(), bodyParser.json());
  
  app.listen(PORT, () => {
    console.log("Server running on port 7000");
  });

  `;
  return index;
}
module.exports = serverCreator;
