const commentsRouter = require("express").Router();

const { patchCommentById, deleteCommentById } = require("../controllers/c-comments");
const { badMethod, routeNotFound } = require("../error-handlers/error-handlers");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all(badMethod);

commentsRouter.use("/*", routeNotFound);

module.exports = commentsRouter;
