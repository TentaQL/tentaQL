function mysql_serverCreator() {
  const mysqlAdapter = `const express = require('express');
  const graphqlHTTP = require('express-graphql');
  const schema = require('./graphql-schema');
  const app = express();
  
  app.use('/graphql', graphqlHTTP({
      schema,
      graphiql: true 
  }));
  
  app.listen(8642, () => {
    console.log('Greetings from the TentalQL team! To get started with graphQL and your MySQL Database, please go to http://localhost:8642/graphql');
  });
  `;
  return mysqlAdapter;
}

module.exports = mysql_serverCreator;