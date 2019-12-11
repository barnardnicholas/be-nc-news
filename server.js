const express = require("express");
const server = express();
const apiRouter = require("./router/r-api");
const { handlingErrors, sqlErrors, errorCatcher } = require("./error-handlers/error-handlers");

server.use(express.json());

server.use("/api", apiRouter);

server.use(handlingErrors);

server.use(sqlErrors);

server.use(errorCatcher);

module.exports = server;
