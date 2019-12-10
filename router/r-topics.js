const topicsRouter = require("express").Router();
const { getAllTopics } = require("../controllers/c-topics");
const { badMethod, routeNotFound } = require("../error-handlers/error-handlers");

topicsRouter
  .route("/")
  .get(getAllTopics)
  .all(badMethod);

topicsRouter.use("/*", routeNotFound);

module.exports = topicsRouter;
