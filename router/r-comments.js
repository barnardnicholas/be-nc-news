const commentsRouter = require("express").Router();

const { patchCommentById, deleteCommentById } = require("../controllers/c-comments");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(deleteCommentById);

module.exports = commentsRouter;
