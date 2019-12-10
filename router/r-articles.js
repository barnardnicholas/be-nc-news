const articlesRouter = require("express").Router();

const {
  getAllArticles,
  getArticleById,
  patchArticleById,
  postCommentByArticleId,
  getCommentsByArticleId
} = require("../controllers/c-articles");

articlesRouter.use("/", getAllArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);

articlesRouter
  .route("/:article_id/comments")
  .post(postCommentByArticleId)
  .get(getCommentsByArticleId);

module.exports = articlesRouter;
