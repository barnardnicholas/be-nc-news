const connection = require("../db/connection");

const fetchUserById = username => {
  return connection("users")
    .select("*")
    .where("username", "=", username)
    .returning("*")
    .then(user => {
      return { users: user[0] };
    });
};

module.exports = { fetchUserById };
