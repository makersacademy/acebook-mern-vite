const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
const tokenChecker = require("../middleware/tokenChecker");

router.post("/", UsersController.create);
router.get("/", tokenChecker, UsersController.getUser);


module.exports = router;
