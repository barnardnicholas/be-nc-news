const connection = require("../db/connection");
const fs = require("fs");

const fetchApi = cb => {
  fs.readFile(__dirname + "/../endpoints.json", "utf-8", (err, data) => {
    let apiRes = JSON.parse(data);
    cb(null, { API: apiRes });
  });
};
module.exports = { fetchApi };
