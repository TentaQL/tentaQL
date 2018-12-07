function readmeCreator(database, uri) {
  const readme = `
  # GraphQL, Meet ${database}!

  ## Your Database URI: ${uri}

## Hello again from Tentaql!

<p align="center">
<img src="https://github.com/TentaQL/tentaQL/raw/master/assets/Octopus.png" align="center" height="400">
</p>

# How it works

Paste your database address in the URL box, and click "Convert your DB". (Note: If running your Database locally, please use your IP address as 'host' and allow all remote connections)

<p align="center">
<img src="https://github.com/TentaQL/tentaQL/raw/master/assets/GraphiQL.png" align="center" height="400">
</p>

Your database is now converted to GraphQL language. This 

Please navigate into this directory in your terminal, then run the following commands:

````npm install````

````npm run start```` 

As soon as the server starts, a localhost will automatically launch in the browser using <a href="https://github.com/graphql/graphiql">GraphiQL</a>.  Now you can start querying/mutating your Database!

# Authors

[Jonathan Schwartz @filmboy3](https://github.com/filmboy3)

[Anna Brakowska @AnnaBrakowska](https://github.com/AnnaBrakowska)

[Jonah Wilkof - @jwilkof](https://github.com/jwilkof)

[Alan Thompson - @PabloSphere](https://github.com/PabloSphere)

`;
return readme;
}

module.exports = readmeCreator;