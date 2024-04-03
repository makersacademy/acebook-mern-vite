const tokenChecker = require("../middleware/tokenChecker");
const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.get("/", tokenChecker, UsersController.getProfile);
router.post("/", UsersController.create);

module.exports = router;
