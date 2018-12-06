const express = require("express");
const app = express();
const PORT = process.env.PORT || "8080";
const bodyParser = require("body-parser");
const cors = require("cors");
var secure = require('ssl-express-www');
const mongoController = require("./controllers/controllerMongo");
const db = require("./controllers/controllers");
const mysqlController = require("./controllers/controllerMySQL");
app.use(bodyParser.json());
app.use(cors());

// if (process.env.NODE_ENV === 'production') {

app.use(express.static("dist"));
app.use(secure);
// Postgres Controller Routes
app.post("/db", db.connect);
app.get("/db/all", db.getTables, db.getFields, db.filterAssociations);

// MongoDB Controller Route
app.get("/db/mongo", mongoController.getDatabase);

// MySQL Controller Route
app.get("/db/mysql", mysqlController.getDatabase);

// Start the Server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
