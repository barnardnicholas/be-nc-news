const usersRouter = require("express").Router();
const { getUserByUsername } = require("../controllers/c-users");

const { badMethod, routeNotFound } = require("../error-handlers/error-handlers");

usersRouter
  .route("/:username")
  .get(getUserByUsername)
  .all(badMethod);

usersRouter.use("/*", routeNotFound);

module.exports = usersRouter;
