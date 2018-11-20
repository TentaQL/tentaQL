const express = require("express");
const app = express();
const PORT = process.env.PORT || "8080";
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./controllers/controllers");
// const mongo = require("./controllers/mongo");
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.end("Hello TentaQL");
});

//this queries all tables and fields
app.post("/db", db.connect);

// app.get("/db/mongo", mongo.connect);

app.get("/db/all", db.getTables, db.getFields, db.filterAssociations);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
