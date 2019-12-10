const connection = require("../db/connection");

const fetchUserById = username => {
  console.log("Reached fetchUserById model");
  return connection("users")
    .select("*")
    .where("username", "=", username)
    .returning("*")
    .then(user => {
      return user;
    });
};

module.exports = { fetchUserById };
