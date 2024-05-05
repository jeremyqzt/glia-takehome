const express = require("express");
const router = express.Router();
const boredController = require("../controllers/bored.controller");
const userController = require("../controllers/user.controller");

/* GET activity. */
router.get("/", boredController.get);

module.exports = router;
