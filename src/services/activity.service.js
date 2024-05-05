const client = require("../clients/boredApi.client");
const util = require("../utils/helper.util");
const userService = require("../dao/user.dao");

const getAnyActivity = async (userId) => {
  let bounds = null;
  if (userId) {
    bounds = await userService.getBounds(userId);
  }
  const activity = await client.getActivity(bounds?.res?.[0] ?? null);
  return util.overwriteAccessibilityAndCost(activity);
};

module.exports = {
  getAnyActivity,
};
