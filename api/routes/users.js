const express = require("express");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker");

const UsersController = require("../controllers/users");

router.get("/", tokenChecker, UsersController.getUserProfile);
router.get("/checkusername", UsersController.checkUsername)
router.post("/", UsersController.create);

module.exports = router;
