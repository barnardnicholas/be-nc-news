const { fetchUserById } = require("../models/m-users");

exports.getUserByUsername = (req, res, next) => {
  // console.log("Reached getUserById controller");
  fetchUserById(req.params.username)
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      next(err);
    });
};
