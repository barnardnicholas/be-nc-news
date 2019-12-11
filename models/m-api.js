const connection = require("../db/connection");
const { apiRes } = require("../db/data/api-data");
const fs = require("fs");

const fetchApi = cb => {
  console.log("Reached fetchApi model");
  fs.readFile(__dirname + "/../endpoints.json", "utf-8", (err, data) => {
    let apiRes = JSON.parse(data);
    // console.log(apiRes);
    cb(null, { API: apiRes });
  });
};
module.exports = { fetchApi };
