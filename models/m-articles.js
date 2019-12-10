const connection = require("../db/connection");

const fetchAllArticles = () => {
  console.log("Reached fetchAllArticles model");
  return connection("articles")
    .select("*")
    .returning("*")
    .then(article => {
      return article;
    });
};

const fetchArticleById = article_id => {
  console.log("Reached fetchArticleById model");
  return connection("articles")
    .select("*")
    .where("article_id", "=", article_id)
    .returning("*")
    .then(article => {
      return article;
    });
};

module.exports = { fetchAllArticles, fetchArticleById };
