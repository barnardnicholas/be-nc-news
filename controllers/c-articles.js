const {
  fetchAllArticles,
  fetchArticleById,
  updateArticleById,
  insertCommentByArticleId,
  fetchCommentsByArticleId
} = require("../models/m-articles");

exports.getAllArticles = (req, res, next) => {
  // console.log("Reached getAllArticles controller");
  const { sort_by, order, author, topic } = req.query;
  fetchAllArticles(sort_by, order, author, topic)
    .then(article => {
      res.status(200).send(article);
    })
    .catch(err => {
      next(err);
    });
};

exports.getArticleById = (req, res, next) => {
  fetchArticleById(req.params.article_id)
    .then(article => {
      res.status(200).send(article);
    })
    .catch(err => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  updateArticleById(req.params.article_id, req.body)
    .then(updatedArticle => {
      res.status(200).send(updatedArticle);
    })
    .catch(err => {
      next(err);
    });
};

exports.postCommentByArticleId = (req, res, next) => {
  insertCommentByArticleId(req.params.article_id, req.body)
    .then(postedComment => {
      res.status(201).send(postedComment);
    })
    .catch(err => {
      next(err);
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { sort_by, order } = req.query;
  fetchCommentsByArticleId(req.params.article_id, sort_by, order)
    .then(returnedComments => {
      res.status(200).send(returnedComments);
    })
    .catch(err => {
      next(err);
    });
};
