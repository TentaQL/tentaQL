function mongo_serverCreator(uri) {
    const mongoAdapter = `
  
    const express = require('express');
    const graphqlHTTP = require('express-graphql');
    const schema = require('./graphql-schema');
    const path = require('path');
    const app = express();
    const mongoose = require('mongoose');
    const MongoDB = '${uri}';
    
    mongoose.connect(MongoDB, { useNewUrlParser: true }, () => console.log('We are now connected to your Mongo Database'));
    
    app.use(express.static(path.join(__dirname, './public')))
    
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true 
    }));
    
    app.listen(2468, () => {
      console.log('To get started, please head over to http://localhost:2468/graphql')
    });
    `;
    return mongoAdapter;
  }
  
  module.exports = mongo_serverCreator;