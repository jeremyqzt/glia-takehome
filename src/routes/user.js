const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

/* Create user. */
router.post("/", userController.create);

module.exports = router;
