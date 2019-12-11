const apiRouter = require("express").Router();

const topicsRouter = require("./r-topics");
const usersRouter = require("./r-users");
const articlesRouter = require("./r-articles");
const commentsRouter = require("./r-comments");

const { routeNotFound } = require("../error-handlers/error-handlers");
const { getApi } = require("../controllers/c-api");

apiRouter.get("/", getApi);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/*", routeNotFound);

module.exports = apiRouter;
