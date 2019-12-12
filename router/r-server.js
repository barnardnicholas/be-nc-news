const mainRouter = require("express").Router();

const apiRouter = require("./r-api");
const topicsRouter = require("./r-topics");
const usersRouter = require("./r-users");
const articlesRouter = require("./r-articles");
const commentsRouter = require("./r-comments");

const { routeNotFound } = require("../error-handlers/error-handlers");

mainRouter.use("/", apiRouter);
mainRouter.use("/topics", topicsRouter);
mainRouter.use("/users", usersRouter);
mainRouter.use("/articles", articlesRouter);
mainRouter.use("/comments", commentsRouter);
mainRouter.use("/*", routeNotFound);

module.exports = mainRouter;
