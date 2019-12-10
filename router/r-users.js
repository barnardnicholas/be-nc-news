const usersRouter = require("express").Router();
const { getUserByUsername } = require("../controllers/c-users");

usersRouter.use("/:username", getUserByUsername);

module.exports = usersRouter;
