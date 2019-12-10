const apiRouter = require("express").Router();

const topicsRouter = require("./r-topics");
const usersRouter = require("./r-users");
const articlesRouter = require("./r-articles");
const commentsRouter = require("./r-comments");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
