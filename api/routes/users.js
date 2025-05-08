const express = require("express");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker");

const UsersController = require("../controllers/users");

router.get("/", tokenChecker, UsersController.getUserProfile);
router.get("/getMyUsername", tokenChecker, UsersController.getMyUsername);
router.get("/getUsers", tokenChecker, UsersController.getUsers);
router.get("/checkusername", UsersController.checkUsername);
router.get("/:username", tokenChecker, UsersController.getAnyUserProfile);
router.post("/", UsersController.create);
router.post("/follow", tokenChecker, UsersController.follow);
router.post("/unfollow", tokenChecker, UsersController.unfollow);


module.exports = router;
