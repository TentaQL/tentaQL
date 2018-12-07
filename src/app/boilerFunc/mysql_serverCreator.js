function mysql_serverCreator() {
  const mysqlAdapter = `const express = require('express');
  const graphqlHTTP = require('express-graphql');
  const schema = require('./graphql-schema');
  const app = express();
  const open = require("open");
  const PORT = "2468";
  
  app.use('/graphql', graphqlHTTP({
      schema,
      graphiql: true 
  }));
  
  app.listen(PORT, () => {
    console.log('Greetings from the TentalQL team! To get started with graphQL and your MySQL Database, please go to http://localhost:2468/graphql');
  });
  
  open("http://localhost:2468/graphql");
  `;
  return mysqlAdapter;
}

module.exports = mysql_serverCreator;