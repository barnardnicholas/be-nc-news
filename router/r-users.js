const usersRouter = require("express").Router();
const { getUserById } = require("../controllers/c-users");

usersRouter.use("/:user_id", getUserById);

module.exports = usersRouter;
