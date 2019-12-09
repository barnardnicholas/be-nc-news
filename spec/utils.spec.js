const { expect } = require("chai");
const { formatDates, makeRefObj, formatComments } = require("../db/utils/utils");

describe("formatDates", () => {
  it("shoudl return an empty array if passed an empty array", () => {
    const articles = [];
    const actualResult = formatDates(articles);
    expect(actualResult).to.eql(articles);
  });
  it("should return an array of objects", () => {
    const articles = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const actualResult = formatDates(articles);
    expect(actualResult).to.be.an("array");
    expect(actualResult[0]).to.be.an("object");
  });
  it("objects in the array should have the correct keys", () => {
    const articles = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const actualResult = formatDates(articles);
    expect(actualResult[0]).to.include.keys(
      "title",
      "topic",
      "author",
      "body",
      "created_at",
      "votes"
    );
  });
  it("single object's created_at value should have the correct date format", () => {
    const articles = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const thisDate = new Date(articles[0].created_at);
    const actualResult = formatDates(articles);
    expect(actualResult[0].created_at).to.eql(thisDate);
  });
  it("multiple object's created_at value should have the correct date format", () => {
    const articles = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1416140514171
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      }
    ];
    const thisDate1 = new Date(articles[0].created_at);
    const thisDate2 = new Date(articles[1].created_at);
    const thisDate3 = new Date(articles[2].created_at);

    const actualResult = formatDates(articles);
    expect(actualResult[0].created_at).to.eql(thisDate1);
    expect(actualResult[1].created_at).to.eql(thisDate2);
    expect(actualResult[2].created_at).to.eql(thisDate3);
  });
});

describe("makeRefObj", () => {});

describe("formatComments", () => {});
