const connection = require("../db/connection");

const fetchUserById = username => {
  if (parseInt(username) == username) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return connection("users")
    .select("*")
    .where("username", "=", username)
    .then(user => {
      if (user.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return { user: user[0] };
    });
};

module.exports = { fetchUserById };
