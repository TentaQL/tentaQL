const express = require("express");
const app = express();
const PORT = process.env.PORT || "8080";
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./controllers/controllers");
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.end("Hello TentaQL");
});

//this queries all tables and fields
app.post("/db", db.connect);

app.get(
  "/db/all",
  (req, res, next) => {
    db.getTables(req, res)
      .then(() => next())
      .catch(err => res.json(err));
  },
  (req, res, next) => {
    db.getFields(req, res)
      .then(() => next())
      .catch(err => res.json(err));
  },
  (req, res) => {
    db.filterAssociations(req, res)
      .then(response => {
        console.log("RESPONSE, ", response);
        res.end(JSON.stringify(response));
      })
      .catch(err => res.json(err));
  }
);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = server;
