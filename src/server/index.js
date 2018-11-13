const express = require("express");
const app = express();
const PORT = process.env.PORT || "8080";
const bodyParser = require("body-parser");
const db = require("./controllers/controllers");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.end("Hello TentaQL");
});

//this queries all tables and fields
app.get("/db", db.connect, db.getTables, db.getFields, db.filterAssociations);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
