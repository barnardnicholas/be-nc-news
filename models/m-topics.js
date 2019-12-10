const connection = require("../db/connection");

const fetchAllTopics = () => {
  return connection("topics")
    .select("*")
    .returning("*")
    .then(topics => {
      return { topics: topics };
    });
};
module.exports = { fetchAllTopics };
