const articlesRouter = require("express").Router();

const {
  getAllArticles,
  getArticleById,
  patchArticleById,
  postCommentByArticleId,
  getCommentsByArticleId
} = require("../controllers/c-articles");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);

articlesRouter
  .route("/:article_id/comments")
  .post(postCommentByArticleId)
  .get(getCommentsByArticleId);

articlesRouter.use("/", getAllArticles);

module.exports = articlesRouter;
