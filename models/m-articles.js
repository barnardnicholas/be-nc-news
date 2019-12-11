const connection = require("../db/connection");

const fetchAllArticles = (sort_by = "created_at", order = "asc", author, topic) => {
  return connection("articles")
    .select("*")
    .orderBy(sort_by, order)
    .modify(query => {
      if (author !== undefined) {
        return query.where("author", "=", author);
      }
    })
    .modify(query => {
      if (topic !== undefined) {
        return query.where("topic", "=", topic);
      }
    })
    .returning("*")
    .then(article => {
      return { articles: article };
    });
};

const fetchArticleById = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .count({ comment_count: "comment_id" })
    .where("articles.article_id", "=", article_id)
    .groupBy("articles.article_id")
    .then(article => {
      return { article: article[0] };
    });
};

const updateArticleById = (article_id, votes) => {
  return connection("articles")
    .where("article_id", "=", article_id)
    .increment("votes", votes.inc_votes)
    .returning("*")
    .then(updatedArticle => {
      return { articles: updatedArticle[0] };
    });
};

const insertCommentByArticleId = (article_id, comment) => {
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
