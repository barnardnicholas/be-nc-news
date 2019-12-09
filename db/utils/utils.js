exports.formatDates = list => {
  const listCopy = [...list];
  return listCopy.map(article => {
    const { created_at, ...keys } = article;
    thisDate = new Date(created_at);
    return {
      created_at: thisDate,
      ...keys
    };
  });
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
