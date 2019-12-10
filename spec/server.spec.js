const server = require("../server.js");
const chai = require("chai");
const { expect } = require("chai");
const chaiSorted = require("sams-chai-sorted");
const connection = require("../db/connection");
const request = require("supertest");
chai.use(chaiSorted);

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
              expect(topics.body.topics).to.be.an("array");
              expect(topics.body.topics.length).to.equal(3);
              expect(topics.body.topics[0]).to.be.an("object");
              expect(topics.body.topics[0]).to.have.keys("slug", "description");
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
              expect(user.body.users).to.be.an("object");
              expect(user.body.users).eql(expectedResult);
            });
        });
      });
    });
    describe("/articles", () => {
      describe.only("GET:200 - Get all articles", () => {
        it("returns 200 along with a list of articles", () => {
          return request(server)
            .get("/api/articles")
            .expect(200)
            .then(articles => {
              expect(articles.body).to.be.an("object");
              expect(articles.body.articles).to.be.an("array");
              expect(articles.body.articles.length).to.be.greaterThan(0);
              expect(articles.body.articles[0]).to.be.an("object");
              expect(articles.body.articles[0]).to.have.keys(
                "article_id",
                "title",
                "body",
                "votes",
                "author",
                "created_at",
                "topic"
              );
            });
        });
        it("accepts queries for sort_by", () => {
          return request(server)
            .get("/api/articles?sort_by=author")
            .expect(200)
            .then(articles => {
              expect(articles.body.articles).to.be.ascendingBy("author");
            });
        });
        it("accepts queries for order", () => {
          return request(server)
            .get("/api/articles?order=desc")
            .expect(200)
            .then(articles => {
              expect(articles.body.articles).to.be.descendingBy("created_at");
            });
        });
        it("accepts queries for author", () => {
          return request(server)
            .get("/api/articles?author=butter_bridge")
            .expect(200)
            .then(articles => {
              articles.body.articles.forEach(article => {
                expect(article.author).to.equal("butter_bridge");
              });
            });
        });
        it("accepts queries for topic", () => {
          return request(server)
            .get("/api/articles?topic=mitch")
            .expect(200)
            .then(articles => {
              articles.body.articles.forEach(article => {
                expect(article.topic).to.equal("mitch");
              });
            });
        });
        it("accepts multiple queries", () => {
          return request(server)
            .get("/api/articles?sort_by=votes&order=desc&author=butter_bridge&topic=mitch")
            .expect(200)
            .then(articles => {
              expect(articles.body.articles).to.be.descendingBy("votes");
              articles.body.articles.forEach(article => {
                expect(article.author).to.equal("butter_bridge");
                expect(article.topic).to.equal("mitch");
              });
            });
        });
      });
      describe("GET:200 - Get article by article_id", () => {
        it("returns a single article when passed the correct endpoint and article id number", () => {
          return request(server)
            .get("/api/articles/1")
            .expect(200)
            .then(article => {
              const expectedResult = {
                article_id: 1,
                title: "Living in the shadow of a great man",
                body: "I find this existence challenging",
                votes: 100,
                author: "butter_bridge",
                created_at: "2018-11-15T12:21:54.171+00:00",
                topic: "mitch"
              };
              expect(article.body.article).to.be.an("object");
              expect(article.body.article).eql(expectedResult);
            });
        });
      });
      describe("PATCH:200 - Patch article by ID", () => {
        it("returns an updated article when sent a patch request", () => {
          return request(server)
            .patch("/api/articles/1")
            .send({ inc_votes: -1 })
            .expect(200)
            .then(response => {
              const expectedResult = {
                article_id: 1,
                title: "Living in the shadow of a great man",
                body: "I find this existence challenging",
                votes: 99,
                author: "butter_bridge",
                created_at: "2018-11-15T12:21:54.171+00:00",
                topic: "mitch"
              };
              expect(response.body.articles).to.be.an("object");
              expect(response.body.articles).to.eql(expectedResult);
            });
        });
      });
      describe("POST:201 - Post comment on article", () => {
        it("returns the posted comment, having updated the database", () => {
          const expectedResult = {
            body: "lovely",
            article_id: 3,
            author: "rogersop",
            votes: 0,
            comment_id: 19
          };
          return request(server)
            .post("/api/articles/3/comments")
            .send({ username: "rogersop", body: "lovely" })
            .expect(201)
            .then(comment => {
              expect(comment.body.comments).to.be.an("object");
              expect(comment.body.comments.body).to.eql(expectedResult.body);
              expect(comment.body.comments.article_id).to.eql(expectedResult.article_id);
              expect(comment.body.comments.votes).to.eql(expectedResult.votes);
              expect(comment.body.comments.author).to.eql(expectedResult.author);
              expect(comment.body.comments).to.include.keys("created_at", "comment_id");
            });
        });
      });
      describe("GET:200 - Get comments by article id", () => {
        it("returns an array of comments for a given article", () => {
          return request(server)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(comments => {
              expect(comments.body.comments).to.be.an("array");
              expect(comments.body.comments[0]).to.include.keys(
                "comment_id",
                "votes",
                "created_at",
                "author",
                "body"
              );
              comments.body.comments.forEach(comment => {
                expect(comment).to.be.an("object");
                expect(comment.article_id).to.equal(1);
              });
            });
        });
        it("defaults sort_by and order with no queries passed", () => {
          return request(server)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(comments => {
              expect(comments.body.comments).to.be.an("array");
              expect(comments.body.comments).to.be.ascendingBy("created_at");
            });
        });
        it("accepts sort_by queries for columns", () => {
          return request(server)
            .get("/api/articles/1/comments?sort_by=author")
            .expect(200)
            .then(comments => {
              expect(comments.body.comments).to.be.an("array");
              expect(comments.body.comments).to.be.ascendingBy("author");
            });
        });
        it("accepts sort_by and order queries for columns", () => {
          return request(server)
            .get("/api/articles/1/comments?sort_by=article_id&order=desc")
            .expect(200)
            .then(comments => {
              expect(comments.body.comments).to.be.an("array");
              expect(comments.body.comments).to.be.descendingBy("article_id");
            });
        });
      });
    });
    describe("/comments", () => {});
    describe("ERRORS", () => {});
  });
});
