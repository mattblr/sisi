const dataResolver = require("./data");
const userResolver = require("./auth");
const speechResolver = require("./speech");

const rootResolver = {
  ...dataResolver,
  ...userResolver,
  ...speechResolver,
};

module.exports = rootResolver;
