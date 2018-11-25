function serverCreator() {
  const index = `
  
  const express = require("express");
  
  const PORT = "7000";
  const expressGraphQL = require("express-graphql");
  const bodyParser = require("body-parser");
  const cors = require("cors");

<<<<<<< HEAD
  const schema = require("./graphql/schema/typeDefs");
=======

  const schema = require("./client/graphql/schema");
>>>>>>> 186ec3a1424443c4fb1342d1ff5f5edd6ddc05c3
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
