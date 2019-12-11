exports.badMethod = (req, res, next) => {
  console.log("Reached badMethod error handler");
  res.status(405).send({ msg: "Method not allowed" });
};
exports.badRequest = (req, res, next) => {
  console.log("Reached badRequest error handler");
  res.status(400).send({ msg: "Bad request" });
};
exports.routeNotFound = (req, res, next) => {
  console.log("Reached routeNotFound error handler");
  res.status(404).send({ msg: "Not found" });
};
exports.handlingErrors = (err, req, res, next) => {
  console.log("Reached handlingErrors error handler");
  const errorCodes = {
    404: "Not found",
    400: "Bad request",
    405: "Method not allowed"
  };
  if (errorCodes.hasOwnProperty(err.status)) {
    res.status(err.status).send({ msg: errorCodes[err.status] });
  } else next(err);
};
exports.sqlErrors = (err, req, res, next) => {
  console.log("Reached sqlErrors error handler");
  const errorCodes = {
    "42703": [404, "Not found"],
    "23502": [400, "Bad request"],
    "22P02": [400, "Bad request"],
    "23503": [400, "Bad request"]
  };
  if (errorCodes.hasOwnProperty(err.code)) {
    res.status(errorCodes[err.code][0]).send({ msg: errorCodes[err.code][1] });
  } else next(err);
};
exports.errorCatcher = (err, req, res, next) => {
  console.log("Reached errorCatcher error handler");
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
};

// Error scenarios

// API
// GET:404 - path path to /api/badpath

// TOPICS
// GET:404 - bad path to /api/topics - DONE
// POST:405 - bad method to /api/topics - DONE

// USERS
// GET:404 - bad path to /api/users - DONE
// GET:400 - incorrect data type to /api/users/:username - DONE
// POST:405 - bad method to /api/users - DONE

// ARTICLES
// GET:404 - bad path to /api/articles/ - DONE
// GET:404 - bad path to /api/articles/:article_id - DONE
// POST:405 - bad method to /api/articles/:article_id - DONE
// POST:400 - bad request body - extra keys etc - DONE

// COMMENTS
// GET:404 - bad path to /api/comments - DONE
// POST:405 - bad method to /api/comments - DONE
// PATCH:400 - bad request body - extra keys etc - DONE
