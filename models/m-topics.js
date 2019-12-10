const connection = require("../db/connection");

const fetchAllTopics = () => {
  console.log("Reached fetchAllTopics model");
  return connection("topics")
    .select("*")
    .returning("*")
    .then(topics => {
      return topics;
    });
};
module.exports = { fetchAllTopics };
