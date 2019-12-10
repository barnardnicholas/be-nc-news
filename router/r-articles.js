const articlesRouter = require("express").Router();

const {
  getAllArticles,
  getArticleById,
  patchArticleById,
  postCommentByArticleId,
  getCommentsByArticleId
} = require("../controllers/c-articles");

const { badMethod, routeNotFound } = require("../error-handlers/error-handlers");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(badMethod);

articlesRouter
  .route("/:article_id/comments")
  .post(postCommentByArticleId)
  .get(getCommentsByArticleId)
  .all(badMethod);

articlesRouter
  .route("/")
  .get(getAllArticles)
  .all(badMethod);

articlesRouter.use("/*", routeNotFound);

module.exports = articlesRouter;
