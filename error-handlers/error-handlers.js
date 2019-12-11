exports.badMethod = (req, res, next) => {
  console.log("Reached badMethod error handler");
  res.status(405).send({ msg: "Method not allowed" });
};
exports.routeNotFound = (req, res, next) => {
  console.log("Reached routeNotFound error handler");
  res.status(404).send({ msg: "No such endpoint" });
};
exports.sqlErrors = (err, req, res, next) => {
  console.log("Reached sqlErrors error handler");
  console.log(err);
  // 22P02 invalid syntax for column type
  // 42702 column reference is ambiguous
};
exports.errorCatcher = (err, req, res, next) => {
  console.log("Reached errorCatcher error handler");
  console.log(err);
  res.status(err.status).send({ msg: err.msg });
};
