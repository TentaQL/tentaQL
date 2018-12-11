
  
    const express = require('express');
    const graphqlHTTP = require('express-graphql');
    const schema = require('./../graphql-schema');
    const path = require('path');
    const app = express();
    const mongoose = require('mongoose');
    const MongoDB = 'mongodb://admin1:admin1@ds055485.mlab.com:55485/datacenter';
    const PORT = "2469";
    const open = require("open");

    
    mongoose.connect(MongoDB, { useNewUrlParser: true }, () => console.log('We are now connected to your Mongo Database'));
    
    app.use(express.static(path.join(__dirname, './public')))
    
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true 
    }));
    
    app.listen(PORT, () => {
      console.log("console.log('Greetings from the TentalQL team! To get started with graphQL and your Mongo Database, please go to http://localhost:2469/graphql');");
    });
    open("http://localhost:2469/graphql");
    