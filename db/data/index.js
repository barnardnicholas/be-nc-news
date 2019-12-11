const ENV = process.env.NODE_ENV || "development";

const dbConfig = {
  test: require("./test-data/index.js"),
  development: require("./development-data/index.js"),
  production: require("./development-data/index.js")
};

module.exports = dbConfig[ENV];
