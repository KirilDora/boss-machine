const checkMillionDollarIdea = (idea) => {
  return idea.numWeeks*idea.weeklyRevenue > 1000000 ? true : false;
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
