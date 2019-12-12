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
    describe("ERRORS", () => {
      it("GET:404 - bad path to /api", () => {
        return request(server)
          .get("/api/badpath")
          .expect(404)
          .then(response => {
            expect(response.body.msg).to.eql("Not found");
          });
      });
      it("DELETE:405 - returns 405 on invalid method request", () => {
        return request(server)
          .delete("/api")
          .expect(405);
      });
    });
    describe("GET:200 - get all API data", () => {
      it("returns the API data when requested", () => {
        return request(server)
          .get("/api")
          .expect(200)
          .then(response => {
            expect(response.body).to.be.an("object");
            expect(response.body).to.include.keys("API");
            expect(response.body.API).to.include.keys(
              "GET /api",
              "GET /api/topics",
              "GET /api/users/:username",
              "GET /api/articles/:article_id",
              "PATCH /api/articles/:article_id",
              "GET /api/articles/:article_id/comments",
              "POST /api/articles/:article_id/comments",
              "PATCH /api/comments/:comment_id",
              "DELETE /api/comments/:comment_id",
              "GET /api/articles"
            );
          });
      });
    });
    describe("/topics", () => {
      describe("ERRORS", () => {
        it("GET:404 - bad path to /api/topics", () => {
          return request(server)
            .get("/api/topics/wrong")
            .expect(404)
            .then(response => {
              expect(response.body.msg).to.eql("Not found");
            });
        });
        it("POST:405 - bad method to /api/topics", () => {
          return request(server)
            .post("/api/topics")
            .expect(405)
            .then(response => {
              expect(response.body.msg).to.eql("Method not allowed");
            });
        });
        it("", () => {});
      });
      describe("GET:200 - Get all topics", () => {
        it("returns 200 along with a list of topics", () => {
          return request(server)
            .get("/api/topics")
            .expect(200)
            .then(response => {
              expect(response.body).to.be.an("object");
              expect(response.body.topics).to.be.an("array");
              expect(response.body.topics.length).to.equal(3);
              expect(response.body.topics[0]).to.be.an("object");
              expect(response.body.topics[0]).to.have.keys(
                "slug",
                "description"
              );
            });
        });
      });
    });
    describe("/users", () => {
      describe("ERRORS", () => {
        it("GET:404 - bad path to /api/users", () => {
          return request(server)
            .get("/api/uses")
            .expect(404)
            .then(response => {
              expect(response.body.msg).to.eql("Not found");
            });
        });
        it("GET:400 - incorrect data type to /api/users/:username", () => {
          return request(server)
            .get("/api/users/6")
            .expect(400)
            .then(response => {
              expect(response.body.msg).to.eql("Bad request");
            });
        });
        it("GET:404 - throws 404 when sent a get request to invalid user ID", () => {
          return request(server)
            .get("/api/users/not-a-username")
            .expect(404)
            .then(response => {
              expect(response.body.msg).to.eql("Not found");
            });
        });
        it("POST:405 - bad method to /api/users", () => {
          return request(server)
            .post("/api/users/1")
            .expect(405)
            .then(response => {
              expect(response.body.msg).to.eql("Method not allowed");
            });
        });
      });
      describe("GET:200 - Get user by username", () => {
        it("returns a single user when passed the correct enpoint and username", () => {
          return request(server)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then(response => {
              const expectedResult = {
                username: "butter_bridge",
                name: "jonny",
                avatar_url:
                  "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
              };
              expect(response.body.user).to.be.an("object");
              expect(response.body.user).eql(expectedResult);
            });
        });
      });
    });
    describe("/articles", () => {
      describe("ERRORS", () => {
        it("GET:404 - bad path to /api/articles", () => {
          return request(server)
            .get("/api/articless")
            .expect(404)
            .then(response => {
              expect(response.body.msg).to.eql("Not found");
            });
        });
        it("GET:404 - bad path to /api/articles/article_id", () => {
          return request(server)
            .get("/api/articles/0")
            .expect(404)
            .then(response => {
              expect(response.body.msg).to.eql("Not found");
            });
        });
        it("POST:405 - bad method to /api/articles/article_id", () => {
          return request(server)
            .post("/api/articles/1")
            .expect(405)
            .then(response => {
              expect(response.body.msg).to.eql("Method not allowed");
            });
        });
        it("POST:400 - invalid request body sent to /api/articles/3/comments", () => {
          return request(server)
            .post("/api/articles/3/comments")
            .send({ body: "lovely" })
            .expect(400)
            .then(response => {
              expect(response.body.msg).to.eql("Bad request");
            });
        });
        it("PATCH:200 - returns the unchanged article when sent an empty patch request", () => {
          return request(server)
            .patch("/api/articles/1")
            .send({})
            .expect(200)
            .then(response => {
              const expectedResult = {
                article_id: 1,
                title: "Living in the shadow of a great man",
                body: "I find this existence challenging",
                votes: 100,
                author: "butter_bridge",
                created_at: "2018-11-15T12:21:54.171+00:00",
                topic: "mitch"
              };
              expect(response.body.article).to.be.an("object");
              expect(response.body.article).to.eql(expectedResult);
            });
        });
        it("PATCH:400 - returns 400 when sent an invalid patch request", () => {
          return request(server)
            .patch("/api/articles/1")
            .send({ inc_votes: "hello" })
            .expect(400)
            .then(response => {
              expect(response.body.msg).to.eql("Bad request");
            });
        });
        it("PATCH:400 - invalid request body sent to /api/articles/1", () => {
          return request(server)
            .patch("/api/articles/1")
            .send({ inc_votesss: -6 })
            .expect(200)
            .then(response => {
              const expectedResult = {
                article_id: 1,
                title: "Living in the shadow of a great man",
                body: "I find this existence challenging",
                votes: 100,
                author: "butter_bridge",
                created_at: "2018-11-15T12:21:54.171+00:00",
                topic: "mitch"
              };
              expect(response.body.article).to.be.an("object");
              expect(response.body.article).to.eql(expectedResult);
            });
        });
        it("GET:404 - invalid query sent to /api/articles?author=nobody", () => {
          return request(server)
            .get("/api/articles?author=nobody")
            .expect(404)
            .then(response => {
              expect(response.body.msg).to.eql("Not found");
            });
        });
        it("GET:404 - invalid query sent to /api/articles?topic=nothing", () => {
          return request(server)
            .get("/api/articles?topic=nothing")
            .expect(404)
            .then(response => {
              expect(response.body.msg).to.eql("Not found");
            });
        });
        it("GET:404 - invalid query sent to /api/articles?sort_by=not-a-column", () => {
          return request(server)
            .get("/api/articles?sort_by=not-a-column")
            .expect(400)
            .then(response => {
              expect(response.body.msg).to.eql("Bad request");
            });
        });
        it("GET:404 - non-existent article ID passed to /api/articles/1000/comments", () => {
          return request(server)
            .get("/api/articles/1000/comments")
            .expect(404)
            .then(response => {
              expect(response.body.msg).to.eql("Not found");
            });
        });
        it("GET:400 - bad article ID passed to /api/articles/1000/comments", () => {
          return request(server)
            .get("/api/articles/not-an-article/comments")
            .expect(400)
            .then(response => {
              expect(response.body.msg).to.eql("Bad request");
            });
        });
        it("GET:400 - bad sort_by value passed to /api/articles/1/comments", () => {
          return request(server)
            .get("/api/articles/1/comments?sort_by=not-a-column")
            .expect(400)
            .then(response => {
              expect(response.body.msg).to.eql("Bad request");
            });
        });
        it("throws an error when posting to valid but non-existent article ID", () => {
          return request(server)
            .post("/api/articles/30000/comments")
            .send({ username: "rogersop", body: "lovely" })
            .expect(404)
            .then(response => {
              expect(response.body.msg).to.equal("Not found");
            });
        });
      });
      describe("GET:200 - Get all articles", () => {
        it("returns 200 along with a list of articles", () => {
          return request(server)
            .get("/api/articles")
            .expect(200)
            .then(response => {
              expect(response.body).to.be.an("object");
              expect(response.body.articles).to.be.an("array");
              expect(response.body.articles.length).to.be.greaterThan(0);
              expect(response.body.articles[0]).to.be.an("object");
              expect(response.body.articles[0]).to.have.keys(
                "article_id",
                "title",
                "body",
                "votes",
                "author",
                "created_at",
                "topic",
                "comment_count"
              );
            });
        });
        it("accepts queries for sort_by", () => {
          return request(server)
            .get("/api/articles?sort_by=author")
            .expect(200)
            .then(response => {
              expect(response.body.articles).to.be.descendingBy("author");
            });
        });
        it("defaults sort_by and order with no queries passed", () => {
          return request(server)
            .get("/api/articles")
            .expect(200)
            .then(response => {
              expect(response.body.articles).to.be.descendingBy("created_at");
            });
        });
        it("accepts queries for order", () => {
          return request(server)
            .get("/api/articles?order=asc")
            .expect(200)
            .then(response => {
              expect(response.body.articles).to.be.ascendingBy("created_at");
            });
        });
        it("accepts queries for author", () => {
          return request(server)
            .get("/api/articles?author=butter_bridge")
            .expect(200)
            .then(response => {
              response.body.articles.forEach(article => {
                expect(article.author).to.equal("butter_bridge");
              });
            });
        });
        it("accepts queries for topic", () => {
          return request(server)
            .get("/api/articles?topic=mitch")
            .expect(200)
            .then(response => {
              response.body.articles.forEach(article => {
                expect(article.topic).to.equal("mitch");
              });
            });
        });
        it("accepts multiple queries", () => {
          return request(server)
            .get(
              "/api/articles?sort_by=votes&order=asc&author=butter_bridge&topic=mitch"
            )
            .expect(200)
            .then(response => {
              expect(response.body.articles).to.be.ascendingBy("votes");
              response.body.articles.forEach(article => {
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
            .then(response => {
              const expectedResult = {
                article_id: 1,
                title: "Living in the shadow of a great man",
                body: "I find this existence challenging",
                votes: 100,
                author: "butter_bridge",
                created_at: "2018-11-15T12:21:54.171+00:00",
                topic: "mitch",
                comment_count: "13"
              };
              expect(response.body.article).to.be.an("object");
              expect(response.body.article).eql(expectedResult);
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
              expect(response.body.article).to.be.an("object");
              expect(response.body.article).to.eql(expectedResult);
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
            .then(response => {
              expect(response.body.comment).to.be.an("object");
              expect(response.body.comment.body).to.eql(expectedResult.body);
              expect(response.body.comment.article_id).to.eql(
                expectedResult.article_id
              );
              expect(response.body.comment.votes).to.eql(expectedResult.votes);
              expect(response.body.comment.author).to.eql(
                expectedResult.author
              );
              expect(response.body.comment).to.include.keys(
                "created_at",
                "comment_id"
              );
            });
        });
        describe("POST:201 - extra keys sent to /api/articles/3/comments", () => {
          it("should ignore extra keys and update normally", () => {
            const expectedResult = {
              body: "lovely",
              article_id: 3,
              author: "rogersop",
              votes: 0,
              comment_id: 19
            };
            return request(server)
              .post("/api/articles/3/comments")
              .send({
                username: "rogersop",
                body: "lovely",
                wrong_key: "hello"
              })
              .expect(201)
              .then(response => {
                expect(response.body.comment).to.be.an("object");
                expect(response.body.comment.body).to.eql(expectedResult.body);
                expect(response.body.comment.article_id).to.eql(
                  expectedResult.article_id
                );
                expect(response.body.comment.votes).to.eql(
                  expectedResult.votes
                );
                expect(response.body.comment.author).to.eql(
                  expectedResult.author
                );
                expect(response.body.comment).to.include.keys(
                  "created_at",
                  "comment_id"
                );
                expect(response.body.comment).to.not.include.keys("wrong_key");
              });
          });
        });
      });
      describe("POST:201 - extra keys sent to /api/articles/3/comments", () => {
        it("should ignore extra keys", () => {
          const expectedResult = {
            body: "lovely",
            article_id: 3,
            author: "rogersop",
            votes: 0,
            comment_id: 19
          };
          return request(server)
            .post("/api/articles/3/comments")
            .send({ username: "rogersop", body: "lovely", wrong_key: "hello" })
            .expect(201)
            .then(response => {
              expect(response.body.comment).to.be.an("object");
              expect(response.body.comment.body).to.eql(expectedResult.body);
              expect(response.body.comment.article_id).to.eql(
                expectedResult.article_id
              );
              expect(response.body.comment.votes).to.eql(expectedResult.votes);
              expect(response.body.comment.author).to.eql(
                expectedResult.author
              );
              expect(response.body.comment).to.include.keys(
                "created_at",
                "comment_id"
              );
              expect(response.body.comment).to.not.include.keys("wrong_key");
            });
        });
      });
      describe("GET:200 - Get comments by article id", () => {
        it("returns an array of comments for a given article", () => {
          return request(server)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(response => {
              expect(response.body.comments).to.be.an("array");
              expect(response.body.comments[0]).to.include.keys(
                "comment_id",
                "votes",
                "created_at",
                "author",
                "body"
              );
              response.body.comments.forEach(comment => {
                expect(comment).to.be.an("object");
              });
            });
        });
        it("defaults sort_by and order with no queries passed", () => {
          return request(server)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(response => {
              expect(response.body.comments).to.be.an("array");
              expect(response.body.comments).to.be.descendingBy("created_at");
            });
        });
        it("accepts sort_by queries for columns", () => {
          return request(server)
            .get("/api/articles/1/comments?sort_by=author")
            .expect(200)
            .then(response => {
              expect(response.body.comments).to.be.an("array");
              expect(response.body.comments).to.be.descendingBy("author");
            });
        });
        it("accepts sort_by and order queries for columns", () => {
          return request(server)
            .get("/api/articles/1/comments?sort_by=author&order=asc")
            .expect(200)
            .then(response => {
              expect(response.body.comments).to.be.an("array");
              expect(response.body.comments).to.be.ascendingBy("author");
            });
        });
      });
    });
    describe("/comments", () => {
      describe("ERRORS", () => {
        it("GET:404 - bad path to /api/comments", () => {
          return request(server)
            .get("/api/cmments")
            .expect(404)
            .then(response => {
              expect(response.body.msg).to.eql("Not found");
            });
        });
        it("POST:405 - bad method to /api/comments", () => {
          return request(server)
            .get("/api/comments/1")
            .expect(405)
            .then(response => {
              expect(response.body.msg).to.eql("Method not allowed");
            });
        });
        it("PATCH:200 - returns unchanged comment when invalid request body sent to /api/comments/1", () => {
          return request(server)
            .patch("/api/comments/1")
            .send({ inc_votesss: -6 })
            .expect(200)
            .then(response => {
              const expectedResult = {
                body:
                  "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
                article_id: 9,
                author: "butter_bridge",
                votes: 16
              };
              expect(response.body.comments.body).to.eql(expectedResult.body);
              expect(response.body.comments.author).to.eql(
                expectedResult.author
              );
              expect(response.body.comments.votes).to.eql(expectedResult.votes);
              expect(response.body.comments.article_id).to.eql(
                expectedResult.article_id
              );
            });
        });
        it("PATCH:400 - returns 400 when sent an invalid patch request", () => {
          return request(server)
            .patch("/api/comments/1")
            .send({ inc_votes: "hello" })
            .expect(400)
            .then(response => {
              expect(response.body.msg).to.eql("Bad request");
            });
        });
        it("PATCH:400 - returns 400 when sent a valid patch request to an invalid comment ID", () => {
          return request(server)
            .patch("/api/comments/not-a-comment")
            .send({ inc_votes: 1 })
            .expect(400)
            .then(response => {
              expect(response.body.msg).to.eql("Bad request");
            });
        });
        it("PATCH:404 - returns 404 when sent a patch request to a valid comment ID which doesn't exist", () => {
          return request(server)
            .patch("/api/comments/100000")
            .send({ inc_votes: 2 })
            .expect(404)
            .then(response => {
              expect(response.body.msg).to.eql("Not found");
            });
        });
        it("DELETE:404 throws 404 when sent a delete request to a valid but non-existent comment ID", () => {
          return request(server)
            .delete("/api/comments/100000")
            .expect(404)
            .then(response => {
              expect(response.body.msg).to.equal("Not found");
            });
        });
        it("DELETE:400 throws 400 when sent a delete request to an invalid comment ID", () => {
          return request(server)
            .delete("/api/comments/not-a-comment")
            .expect(400)
            .then(response => {
              expect(response.body.msg).to.equal("Bad request");
            });
        });
      });
      describe("PATCH:200 - Patch comment by ID", () => {
        it("updates the number of votes on a comment", () => {
          return request(server)
            .patch("/api/comments/1")
            .send({ inc_votes: -6 })
            .expect(200)
            .then(response => {
              const expectedResult = {
                body:
                  "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
                article_id: 9,
                author: "butter_bridge",
                votes: 10
              };
              expect(response.body.comments.body).to.eql(expectedResult.body);
              expect(response.body.comments.author).to.eql(
                expectedResult.author
              );
              expect(response.body.comments.votes).to.eql(expectedResult.votes);
              expect(response.body.comments.article_id).to.eql(
                expectedResult.article_id
              );
            });
        });
      });
      describe("PATCH:200 - extra keys sent to /api/articles/3/comments", () => {
        it("ignores extra keys in request body", () => {
          return request(server)
            .patch("/api/comments/1")
            .send({ inc_votes: -6, wrong_key: "hello" })
            .expect(200)
            .then(response => {
              const expectedResult = {
                body:
                  "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
                article_id: 9,
                author: "butter_bridge",
                votes: 10
              };
              expect(response.body.comments.body).to.eql(expectedResult.body);
              expect(response.body.comments.author).to.eql(
                expectedResult.author
              );
              expect(response.body.comments.votes).to.eql(expectedResult.votes);
              expect(response.body.comments.article_id).to.eql(
                expectedResult.article_id
              );
              expect(response.body.comments).to.not.include.keys("wrong_key");
            });
        });
      });
      describe("DELETE:204 - Deletes a comment by ID", () => {
        it("deletes a comment when provided with a comment_id", () => {
          return request(server)
            .delete("/api/comments/1")
            .expect(204);
        });
      });
    });
  });
});
