const express = require("express");
const server = express();
const apiRouter = require("./router/r-api");
const {
  badRequest,
  routeNotFound,
  sqlErrors,
  errorCatcher
} = require("./error-handlers/error-handlers");

server.use(express.json());

server.use("/api", apiRouter);

server.use((err, req, res, next) => {
  console.log("--- In the last error handler ---");
  console.log(err);
});

server.use(sqlErrors);

server.use(errorCatcher);

server.all("/*", routeNotFound);

module.exports = server;
