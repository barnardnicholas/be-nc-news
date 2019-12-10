const { fetchAllTopics } = require("../models/m-topics");

exports.getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then(topics => {
      res.status(200).send(topics);
    })
    .catch(err => {
      next(err);
    });
};
