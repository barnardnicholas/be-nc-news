const connection = require("../db/connection");

const fetchAllTopics = () => {
  return connection("topics")
    .select("*")
    .then(topics => {
      return { topics: topics };
    });
};
module.exports = { fetchAllTopics };
