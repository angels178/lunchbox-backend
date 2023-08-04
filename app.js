const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const snackController = require("./controllers/snackController");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/snacks", snackController);

app.get("/", (req, res) => {
  res.send("Welcome to Snacks App");
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found!");
});

module.exports = app;
