const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const { data } = require("./data");
const { pipeline } = require("./MongoPipeline");
// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require("./connector");

app.get("/totalRecovered", async (req, res) => {
  let result = await connection.aggregate(pipeline.totalRecovered);
  res.send({
    data: result[0],
  });
});

app.get("/totalActive", async (req, res) => {
  let result = await connection.aggregate(pipeline.totalActive);
  res.send({
    data: result[0],
  });
});

app.get("/totalDeath", async (req, res) => {
  let result = await connection.aggregate(pipeline.totalDeath);
  res.send({
    data: result[0],
  });
});

app.get("/hotspotStates", async (req, res) => {
  let result = await connection.aggregate(pipeline.hotspotStates);
  res.send({
    data: result,
  });
});

app.get("/healthyStates", async (req, res) => {
  let result = await connection.aggregate(pipeline.healthyStates);
  res.send({
    data: result,
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
