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
      if (updatedComment.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return { comments: updatedComment[0] };
    });
};

const removeCommentById = comment_id => {
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .del()
    .then(response => {
      console.log(response);
      if (response === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      console.log("Comment deleted");
    });
};

module.exports = { updateCommentById, removeCommentById };
