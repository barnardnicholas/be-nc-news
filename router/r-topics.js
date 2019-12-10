const topicsRouter = require("express").Router();
const { getAllTopics } = require("../controllers/c-topics");

topicsRouter.use("/", getAllTopics);

module.exports = topicsRouter;
