const fetch = require("node-fetch");
const config = require("../configs/boredClient.config");
const utils = require("../utils/helper.util");

const getActivity = async (bounds) => {
  return fetch(
    config.url + config.path + (bounds ? utils.buildQparams(bounds) : "")
  )
    .then(async (response) => response.json())
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  getActivity,
};
