module.exports = function(options) {
  return {
    ...options,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  };
};
