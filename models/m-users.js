const connection = require("../db/connection");

const fetchUserById = username => {
  if (parseInt(username) == username) {
    console.log("integer detected");
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return connection("users")
    .select("*")
    .where("username", "=", username)
    .then(user => {
      return { users: user[0] };
    });
};

module.exports = { fetchUserById };
