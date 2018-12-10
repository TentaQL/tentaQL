
  
  const express = require("express");
  
  const PORT = "2468";
  const expressGraphQL = require("express-graphql");
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const open = require("open");


  const schema = require("./client/graphql/schema");
  const app = express();

  app.use("/graphql", expressGraphQL({ schema, graphiql: true }));
  app.use(cors(), bodyParser.json());
  
  app.listen(PORT, () => {
    console.log("console.log('Greetings from the TentalQL team! To get started with graphQL and your Postgres Database, please go to http://localhost:2468/graphql');");
  });

  open("http://localhost:2468/graphql");
  