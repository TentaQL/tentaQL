function mysqlPackageJSONCreator() {
  const pack = `
  {
    "name": "tentaql",
    "version": "1.0.0",
    "description": "Automated GraphQL Schema Creator",
    "main": "index.js",
    "scripts": {
      "start": "node index.js"
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
      "MySQL",
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
      "cors": "^2.8.5",
      "express": "^4.16.4",
      "express-graphql": "^0.7.1",
      "graphql": "^14.0.2",
      "graphql-server-express": "^1.4.0",
      "graphql-tools": "^4.0.3",
      "merge-graphql-schemas": "^1.5.8",
      "promise-mysql": "^3.3.1"
    }
  }
`;
return pack;
}

module.exports = mysqlPackageJSONCreator;