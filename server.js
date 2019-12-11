const express = require("express");
const server = express();
const apiRouter = require("./router/r-api");
const { sqlErrors, errorCatcher } = require("./error-handlers/error-handlers");

server.use(express.json());

server.use("/api", apiRouter);

server.use(sqlErrors);

server.use(errorCatcher);

module.exports = server;
