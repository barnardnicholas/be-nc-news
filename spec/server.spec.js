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
      describe("GET:200 - Get all topics", () => {
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
    describe("/users", () => {
      describe("GET:200 - Get user by username", () => {
        it("returns a single user when passed the correct enpoint and username", () => {
          return request(server)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then(user => {
              const expectedResult = {
                username: "butter_bridge",
                name: "jonny",
                avatar_url: "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
              };
              expect(user.body).to.be.an("object");
              expect(user.body.Users).to.be.an("array");
              expect(user.body.Users.length).to.equal(1);
              expect(user.body.Users[0]).to.be.an("object");
              expect(user.body.Users[0]).eql(expectedResult);
            });
        });
      });
    });
    describe("/articles", () => {});
    describe("/comments", () => {});
  });
});
