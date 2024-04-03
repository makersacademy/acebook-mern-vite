const express = require("express");
const tokenChecker = require("../middleware/tokenChecker");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);
router.patch("/", tokenChecker, UsersController.update);

module.exports = router;
