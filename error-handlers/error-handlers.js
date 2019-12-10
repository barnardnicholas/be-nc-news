exports.badMethod = (err, req, res, next) => {
  console.log("Reached badMethod error handler");
  res.status(405).send({ msg: "Bad method" });
};
exports.routeNotFound = (req, res, next) => {
  console.log("Reached routeNotFound error handler");
  res.status(404).send({ msg: "No such endpoint" });
};
exports.sqlErrors = (err, req, res, next) => {
  console.log("Reached sqlErrors error handler");
};
exports.errorCatcher = (err, req, res, next) => {
  console.log("Reached errorCatcher error handler");
  res.status(err.status).send({ msg: err.msg });
};
