const express = require("express");
const server = express();
const mainRouter = require("./router/r-server");
const {
  handlingErrors,
  sqlErrors,
  errorCatcher
} = require("./error-handlers/error-handlers");

server.use(express.json());

server.get("/", (req, res, next) => {
  res
    .status(200)
    .send({ msg: "Welcome to NB-News. GET /api for more information" });
});

server.use("/api", mainRouter);

server.use(handlingErrors);

server.use(sqlErrors);

server.use(errorCatcher);

module.exports = server;
