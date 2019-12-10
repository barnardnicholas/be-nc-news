const { fetchAllTopics } = require("../models/m-topics");

exports.getAllTopics = (req, res, next) => {
  console.log("Reached getAllTopics controller");
  fetchAllTopics()
    .then(topics => {
      res.status(200).send({ Topics: topics });
    })
    .catch(err => {
      next(err);
    });
};
