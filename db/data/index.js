const ENV = process.env.NODE_ENV || "development";

const dbConfig = {
  test: require("./test-data"),
  development: require("./development-data")
};

module.exports = dbConfig[ENV];
