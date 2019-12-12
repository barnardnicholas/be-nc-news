const apiRouter = require("express").Router();

const { badMethod } = require("../error-handlers/error-handlers");
const { getApi } = require("../controllers/c-api");

apiRouter
  .route("/")
  .get(getApi)
  .all(badMethod);

apiRouter.all(badMethod);

module.exports = apiRouter;
