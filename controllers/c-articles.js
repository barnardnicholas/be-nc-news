const {} = require("../models/m-articles");

exports.getAllArticles = (req, res, next) => {
  console.log("Reached getAllArticles controller");
};
exports.getArticleById = (req, res, next) => {
  console.log("Reached getArticleById controller");
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
