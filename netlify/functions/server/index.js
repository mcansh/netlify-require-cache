const { server } = require("./dist/index.cjs");

exports.handler = async (event, context) => {
  return server(event, context);
};
