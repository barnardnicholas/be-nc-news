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
    const { belongs_to, ...keys } = comment;
    return { article_id: articleRef[comment.belongs_to], ...keys };
  });
};
