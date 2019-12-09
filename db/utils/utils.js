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

exports.makeRefObj = (list, key, value) => {
  let result = {};
  list.forEach(item => {
    result[item[key]] = item[value];
  });
  return result;
};

exports.formatComments = (comments, articleRef) => {};
