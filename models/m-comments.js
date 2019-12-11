const connection = require("../db/connection");

const updateCommentById = (comment_id, votes) => {
  const { inc_votes } = votes;
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .modify(query => {
      if (inc_votes !== undefined) {
        return query.increment("votes", votes.inc_votes);
      }
    })
    .returning("*")
    .then(updatedComment => {
      if (inc_votes !== undefined) {
        return { comments: updatedComment[0] };
      } else {
        return Promise.reject({ status: 400, msg: "Bad request" });
      }
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
