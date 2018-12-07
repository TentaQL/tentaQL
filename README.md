# TentaQL

TentaQL is a fully automated tool for GraphQL data-abstraction-layer creation, with built-in support for PostgreSQL, Mongo, and MySQL. By visiting our easy-to-use browser-based [site](https://www.tentaql.com) -- no complicated logins required, just a simple database URI -- TentaQL introspects schematic data and assembles a lightweight zip package for running a tailor-made GraphQL sandbox environment with the user's database. The zip comes complete with core CRUD query/mutation functionality and support for complex relationships, all while leveraging GraphiQL, an industry-leading visualization tool. For more experienced users, TentaQL also offers in-browser editing to further customize queries/mutations/subscriptions prior to download.

<p align="center">
<img src="https://github.com/TentaQL/tentaQL/blob/master/assets/Octopus.png" align="center" height="400">
</p>

# How it works

Paste your database address in the URL box, and click "Convert your DB". (Note: If running your Database locally, please use your IP address as 'host' and allow all remote connections)

<p align="center">
<img src="https://github.com/TentaQL/tentaQL/blob/master/assets/demo1.png" align="center" height="400">
</p>

<p align="center"><a href="http://www.tentaql.com"><img src="https://github.com/TentaQL/tentaQL/blob/master/assets/Gif_interface.gif" alt="InitialGIF"/></a></p>


Your database is converted to GraphQL language. You should now see the schema.

<p align="center">
<img src="https://github.com/TentaQL/tentaQL/blob/master/assets/demo2.png" align="center" height="400">
</p>


<p align="center"><a href="http://www.tentaql.com"><img src="https://github.com/TentaQL/tentaQL/blob/master/assets/Gif_Scroll.gif" alt="Scrolled Gif"/></a></p>

You can use tabs located above the code editor to switch the view between schema and resolvers.
You can also:
* download converted files by clicking on "Download Original Zip"
* edit schema or resolvers and download edited files by clicking on "Download Edited Zip"
* reset schema or resolvers to it's original state by clicking on "Reset Tab" or reset schema and resolvers by clicking on "Reset All"
* copy current tab view by clicking the "Copy" button

<p align="center">
<img src="https://github.com/TentaQL/tentaQL/blob/master/assets/demo3.png" align="center" height="400">
</p>

Once downloaded, unzip the package, cd into the directory, then run:

```npm install```

```npm run start``` 

<p align="center"><a href="http://www.tentaql.com"><img src="https://github.com/TentaQL/tentaQL/blob/master/assets/Gif_NPMinstall.gif" alt="finalGif"/></a></p>

Example GraphQL server created for MySQL:
<p align="center"><a href="http://www.tentaql.com"><img src="https://github.com/TentaQL/tentaQL/blob/master/assets/Gif_npmrunStart.gif" alt="NPM start"/></a></p>

As soon as the server starts, a locahost will automatically launch in the browser using <a href="https://github.com/graphql/graphiql">GraphiQL</a>.  Now you can start querying your Database!

<p align="center">
<img src="https://github.com/TentaQL/tentaQL/blob/master/assets/GraphiQL.png" align="center" height="400">
</p>

Making a Query on the GraphiQL interface:
<p align="center"><a href="http://www.tentaql.com"><img src="https://github.com/TentaQL/tentaQL/blob/master/assets/Gif_GraphQLQuery.gif" alt="GraphiQL Query"/></a></p>

## Why choose TentaQL?

While there are currently several fantastic providers offering similar schema-introspection for legacy databases -- notably, Prisma and Postgraphile -- the initial setup for these services can be prohibitively time-consuming, involving heavy downloads, and a steep learning curve for teams new to the GraphQL environment looking for a simple, speedy experimentation tool for potential migration to GraphQL.

Thank you so much for your time and consideration -- we're currently in Beta, and welcome any feedback / suggestions. Have a great day, and we hope you enjoy wrapping up your databases in TentaQL!



# Authors

[Anna Brakowska @AnnaBrakowska](https://github.com/AnnaBrakowska)

[Jonathan Schwartz @filmboy3](https://github.com/filmboy3)

[Jonah Wilkof - @jwilkof](https://github.com/jwilkof)

[Alan Thompson - @PabloSphere](https://github.com/PabloSphere)


# Technologies used:
* Redux
* React
* Javascript / ES6
* NodeJS, ExpressJS
* GraphQL
* MySQL
* MongoDB
* PostgreSQL
* Codemirror
* SemanticUI-React
* Webpack, Babel