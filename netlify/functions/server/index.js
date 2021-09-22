const { createRequestHandler } = require("./dist/index.cjs");

exports.handler = async (event, context) => {
  return createRequestHandler(event, context);
};
