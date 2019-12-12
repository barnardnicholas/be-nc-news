const connection = require("../connection");

exports.formatDates = list => {
  return list.map(article => {
    const { created_at, ...keys } = article;
    const thisDate = new Date(created_at);
    return {
      created_at: thisDate,
      ...keys
    };
  });
};

exports.makeRefObj = list => {
  let result = {};
  list.forEach(item => {
    result[item.title] = item.article_id;
  });
  return result;
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(comment => {
    const { belongs_to, created_by, created_at, ...keys } = comment;
    const thisDate = new Date(created_at);
    return {
      article_id: articleRef[comment.belongs_to],
      author: comment.created_by,
      created_at: thisDate,
      ...keys
    };
  });
};

exports.checkAuthorExists = author => {
  return connection
    .select("*")
    .from("users")
    .where("username", "=", author)
    .then(authors => {
      if (authors.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else return { articles: [] };
    });
};

exports.checkTopicExists = topic => {
  return connection
    .select("*")
    .from("topics")
    .where("slug", "=", topic)
    .then(topics => {
      if (topics.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else {
        return { articles: [] };
      }
    });
};

exports.checkArticleExists = article_id => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", "=", article_id)
    .then(articles => {
      if (articles.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else {
        return { comments: [] };
      }
    });
};
