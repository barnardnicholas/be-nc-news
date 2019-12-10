const { updateCommentById, removeCommentById } = require("../models/m-comments");

exports.patchCommentById = (req, res, next) => {
  updateCommentById(req.params.comment_id, req.body)
    .then(comment => {
      res.status(200).send(comment);
    })
    .catch(err => {
      next(err);
    });
};
exports.deleteCommentById = (req, res, next) => {
  removeCommentById(req.params.comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
};
