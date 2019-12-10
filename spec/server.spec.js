const server = require("../server.js");
const { expect } = require("chai");
const connection = require("../db/connection");
const request = require("supertest");

describe("SERVER", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });
  describe("/api", () => {
    describe("/topics", () => {
      describe.only("GET:200 - Get all topics", () => {
        it("returns 200 along with a list of topics", () => {
          return request(server)
            .get("/api/topics")
            .expect(200)
            .then(topics => {
              expect(topics.body).to.be.an("object");
              expect(topics.body.Topics).to.be.an("array");
              expect(topics.body.Topics.length).to.equal(3);
              expect(topics.body.Topics[0]).to.be.an("object");
              expect(topics.body.Topics[0]).to.have.keys("slug", "description");
            });
        });
      });
    });
    describe("/users", () => {});
    describe("/articles", () => {});
    describe("/comments", () => {});
  });
});
