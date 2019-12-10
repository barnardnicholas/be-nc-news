const { fetchAllArticles, fetchArticleById, updateArticleById } = require("../models/m-articles");
exports.getAllArticles = (req, res, next) => {
  console.log("Reached getAllArticles controller");
  fetchAllArticles()
    .then(article => {
      res.status(200).send({ Articles: article });
    })
    .catch(err => {
      next(err);
    });
};
exports.getArticleById = (req, res, next) => {
  console.log("Reached getArticleById controller");
  fetchArticleById(req.params.article_id)
    .then(article => {
      res.status(200).send(article);
    })
    .catch(err => {
      next(err);
    });
};
exports.patchArticleById = (req, res, next) => {
  console.log("Reached patchArticleById controller");
  updateArticleById(req.params.article_id, req.body)
    .then(updatedArticle => {
      res.status(200).send(updatedArticle);
    })
    .catch(err => {
      next(err);
    });
};
exports.postCommentByArticleId = (req, res, next) => {
  console.log("Reached postCommentByArticleId controller");
};
exports.getCommentsByArticleId = (req, res, next) => {
  console.log("Reached getCommentsByArticleId controller");
};
