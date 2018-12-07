function readmeCreator(database, url) {
  if (url[url.length-1] === '/') {
    url = url.slice(0, -1);
  }
  var dbName = url.substring(url.lastIndexOf('/') + 1);
  const readme = `
# GraphQL, Meet ${database}!

## Hello again from Tentaql!

### Requested Database: *${dbName}*

<p align="center">
<img src="https://github.com/TentaQL/tentaQL/raw/master/assets/Octopus.png" align="center" height="400">
</p>

# How it works

<p align="center">
<img src="https://github.com/TentaQL/tentaQL/raw/master/assets/GraphiQL.png" align="center" height="400">
</p>

Your ${database} database, *${dbName}*, is officially linked to a GraphQL playground environment!

Please navigate into this directory in your terminal, then run the following commands to run the server:

*npm install*

*npm run start*

As soon as the server starts, a localhost will automatically launch your browser using <a href="https://github.com/graphql/graphiql">GraphiQL</a>. Now you can start running queries and mutations on *${dbName}*!

# Authors

[Jonathan Schwartz @filmboy3](https://github.com/filmboy3)

[Anna Brakowska @AnnaBrakowska](https://github.com/AnnaBrakowska)

[Jonah Wilkof - @jwilkof](https://github.com/jwilkof)

[Alan Thompson - @PabloSphere](https://github.com/PabloSphere)

`;
return readme;
}

module.exports = readmeCreator;