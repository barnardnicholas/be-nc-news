const connection = require("../db/connection");

const updateCommentById = (comment_id, data) => {
  console.log("Reached updateCommentById model");
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

module.exports = { updateCommentById };
