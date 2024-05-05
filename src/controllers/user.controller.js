const userService = require("../dao/user.dao");

const create = async (req, res, next) => {
  const { body } = req;
  const { username, accessibility, price } = body;
  try {
    res.json(await userService.create(username, accessibility, price));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
};
