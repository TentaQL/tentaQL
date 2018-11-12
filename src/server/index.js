const express = require("express");
const app = express();
const PORT = process.env.PORT || "8080";
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.end("Hello TentaQL");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
