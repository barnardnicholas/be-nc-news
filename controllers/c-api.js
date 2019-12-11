const { fetchApi } = require("../models/m-api");

exports.getApi = (req, res, next) => {
  console.log("Reached getApi controller");
  fetchApi((err, apiData) => {
    if (err) next(err);
    else {
      // console.log(apiData);
      res.status(200).send(apiData);
    }
  });
};
