function packageJSONCreator() {
  const pack = `
  {
  "name": "tentaql",
  "version": "1.0.0",
  "description": "Automated GraphQL Schema Creator",
  "main": "server.js",
  "scripts": {
    "start": "nodemon --exec babel-node server.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/TentaQL/tentaQL.git"
  },
  "babel": {
    "presets": [
        "@babel/env"
    ]
  },
  "keywords": [
    "GraphQL",
    "Postgres",
    "Schema"
  ],
  "author": "Anna Brakowska, Jonathan Schwartz, Jonah Wilkoff, Alan Thompson",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/TentaQL/tentaQL/issues"
  },
  "homepage": "https://github.com/TentaQL/tentaQL#readme",
  "dependencies": {
    "@babel/cli": "^7.1.5",
    "@babel/core": "^7.1.6",
    "@babel/node": "^7.0.0",
    "@babel/preset-env": "^7.1.6",
    "body-parser": "^1.18.3",
    "concurrently": "^4.0.1",
    "cors": "^2.8.5",
    "express": "^4.16.4",
    "express-graphql": "^0.7.1",
    "graphql": "^14.0.2",
    "graphql-server-express": "^1.4.0",
    "graphql-tools": "^4.0.3",
    "merge-graphql-schemas": "^1.5.8",
    "nodemon": "^1.18.6",
    "pg": "^7.6.1",
    "pg-connection-string": "^2.0.0",
    "pg-promise": "^8.5.2"
  }
}
`;
return pack;
}

module.exports = packageJSONCreator;