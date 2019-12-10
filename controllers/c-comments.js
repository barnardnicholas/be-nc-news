const { updateCommentById } = require("../models/m-comments");

exports.patchCommentById = (req, res, next) => {
  // console.log("Reached patchCommentById controller");
  updateCommentById(req.params.comment_id, req.body).then(comment => {
    res.status(200).send(comment);
  });
};
exports.deleteCommentById = (req, res, next) => {
  console.log("Reached deleteCommentById controller");
};
