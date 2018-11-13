const express = require("express");
const app = express();
const PORT = process.env.PORT || "8080";
const bodyParser = require("body-parser");
const db = require("./controllers/controllers");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.end("Hello TentaQL");
});

app.get("/db", db.getTables);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
