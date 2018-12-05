# TentaQL

TentaQL is an open-source, automated SQL (Postrges and MySQL) and NoSQL (MongoDB) introspection and GraphQL conversion tool, providing users a highly customizable GraphQL package to get their legacy databases up and running with GraphQL in minutes. 

<p align="center">
<img src="https://github.com/TentaQL/tentaQL/blob/master/assets/Octopus.png" align="center" height="400">
</p>

<p align="center"><a href="http://www.tentaql.com"><img src="https://github.com/TentaQL/tentaQL/blob/master/assets/InitialGIF.gif" alt="InitialGIF"/></a></p>

By visiting our easy-to-use browser app at Tentaql.com -- no complicated logins required, just a simple database URI -- TentaQL introspects schematic data and assembles a lightweight zip package for running a tailor-made GraphQL sandbox environment for the user's database. The zip comes complete with core CRUD query/mutation functionality and support for complex relationships, all while leveraging GraphiQL, an industry-leading visualization tool. For more experienced users, TentaQL also offers in-browser editibility to further customize queries/mutations/subscriptions prior to download.

While there are currently several fantastic providers offering similar schema-introspection for legacy databases -- notably, Prisma and Postgraphile -- the initial setup for these services can be prohibitively time-consuming, involving heavy downloads, and a steep learning curve for teams new to the GraphQL environment looking for a simple, speedy experimentation tool for potential migration to GraphQL.

<p align="center"><a href="http://www.tentaql.com"><img src="https://github.com/TentaQL/tentaQL/blob/master/assets/SecondGif.gif" alt="secondGif"/></a></p>

# How to use

Paste your database address in the URL box, and click "Convert your DB". (Note: If running your Database locally, please use your IP address as 'host' and allow all remote connections)

<p align="center">
<img src="https://github.com/TentaQL/tentaQL/blob/master/assets/demo1.png" align="center" height="400">
</p>


Your database is converted to GraphQL language. You should now see the schema.

<p align="center">
<img src="https://github.com/TentaQL/tentaQL/blob/master/assets/demo2.png" align="center" height="400">
</p>


You can use tabs located above the code editor to switch the view between schema and resolvers.
You can also:
* download converted files by clicking on "Download Original Zip"
* edit schema or resolvers and download edited files by clicking on "Download Edited Zip"
* reset schema or resolvers to it's original state by clicking on "Reset Tab" or reset schema and resolvers by clicking on "Reset All"
* copy chosen tab by clicking on "Copy Tab"

<p align="center">
<img src="https://github.com/TentaQL/tentaQL/blob/master/assets/demo3.png" align="center" height="400">
</p>

Once downloaded, unzip the package, cd into the directory, then run:

```run npm install```

```npm start``` 

Example TentaQL-created GraphQL directory:
<p align="center"><a href="http://www.tentaql.com"><img src="https://github.com/TentaQL/tentaQL/blob/master/assets/Final.gif" alt="finalGif"/></a></p>

As soon as the server starts, a locahost will automatically launch in the browser using <a href="https://github.com/graphql/graphiql">GraphiQL</a>.  Now you can start querying your Database!

Launching the GraphQL server/GraphiQL:
<p align="center"><a href="http://www.tentaql.com"><img src="https://github.com/TentaQL/tentaQL/blob/master/assets/First10.gif" alt="firstGif"/></a></p>

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