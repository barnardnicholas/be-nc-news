const connection = require("../db/connection");

const fetchAllArticles = () => {
  // console.log("Reached fetchAllArticles model");
  return connection("articles")
    .select("*")
    .returning("*")
    .then(article => {
      return { articles: article };
    });
};

const fetchArticleById = article_id => {
  // console.log("Reached fetchArticleById model");
  return connection("articles")
    .select("*")
    .where("article_id", "=", article_id)
    .returning("*")
    .then(article => {
      return { article: article[0] };
    });
};

const updateArticleById = (article_id, data) => {
  // console.log("Reached updateArticleById model");
  return connection("articles")
    .where("article_id", "=", article_id)
    .returning("votes")
    .then(existingVotes => {
      const newData = { votes: existingVotes[0].votes + data.inc_votes };
      return connection
        .from("articles")
        .where("article_id", "=", article_id)
        .update(newData)
        .returning("*");
    })
    .then(updatedArticle => {
      return { articles: updatedArticle[0] };
    });
};

const insertCommentByArticleId = (article_id, comment) => {
  // console.log("Reached insertCommentByArticleId model");
  const datePosted = new Date();
  const completeComment = {
    author: comment.username,
    votes: 0,
    body: comment.body,
    article_id: article_id,
    created_at: datePosted
  };
  return connection("comments")
    .insert(completeComment)
    .returning("*")
    .then(postedComment => {
      return { comments: postedComment[0] };
    });
};

const fetchCommentsByArticleId = (article_id, sort_by = "created_at", order = "asc") => {
  // console.log("Reached fetchCommentsByArticleId model");
  return connection("comments")
    .where("article_id", "=", article_id)
    .orderBy(sort_by, order)
    .returning("*")
    .then(comments => {
      return { comments: comments };
    });
};

module.exports = {
  fetchAllArticles,
  fetchArticleById,
  updateArticleById,
  insertCommentByArticleId,
  fetchCommentsByArticleId
};
