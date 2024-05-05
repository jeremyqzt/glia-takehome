const activityService = require("../services/activity.service");

const get = async (req, res, next) => {
  const userId = req.get("userId");
  try {
    res.json(await activityService.getAnyActivity(userId));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  get,
};
