const express = require("express");

const UsersController = require("../controllers/users");
const tokenChecker = require("../middleware/tokenChecker");

const router = express.Router();
router.get("/", UsersController.getAllUsers);
router.post("/", UsersController.create);
router.post("/friends",tokenChecker, UsersController.addFriend);
router.delete("/friends", tokenChecker, UsersController.removeFriend);

module.exports = router;
