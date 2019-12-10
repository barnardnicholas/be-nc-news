const express = require("express");
const server = express();

const apiRouter = require("./router/r-api");

server.use(express.json());

server.use("/api", apiRouter);

server.use((err, req, res, next) => {
  console.log("--- In the last error handler ---");
  console.log(err);
});

module.exports = server;
