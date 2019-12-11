const connection = require("../db/connection");

const updateCommentById = (comment_id, votes) => {
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .increment("votes", votes.inc_votes)
    .returning("*")
    .then(updatedComment => {
      return { comments: updatedComment[0] };
    });
};

const removeCommentById = comment_id => {
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .del()
    .then(() => {
      console.log("Comment deleted");
    });
};

module.exports = { updateCommentById, removeCommentById };
