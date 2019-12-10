const connection = require("../db/connection");

const updateCommentById = (comment_id, data) => {
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .returning("votes")
    .then(existingVotes => {
      const newVotes = { votes: existingVotes[0].votes + data.inc_votes };
      return connection
        .from("comments")
        .where("comment_id", "=", comment_id)
        .update(newVotes)
        .returning("*");
    })
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
