const { fetchAllArticles, fetchArticleById } = require("../models/m-articles");
exports.getAllArticles = (req, res, next) => {
  console.log("Reached getAllArticles controller");
  fetchAllArticles().then(article => {
    res.status(200).send({ Articles: article });
  });
};
exports.getArticleById = (req, res, next) => {
  console.log("Reached getArticleById controller");
  fetchArticleById(req.params.article_id).then(article => {
    res.status(200).send({ Articles: article });
  });
};
exports.patchArticleById = (req, res, next) => {
  console.log("Reached patchArticleById controller");
};
exports.postCommentByArticleId = (req, res, next) => {
  console.log("Reached postCommentByArticleId controller");
};
exports.getCommentsByArticleId = (req, res, next) => {
  console.log("Reached getCommentsByArticleId controller");
};
