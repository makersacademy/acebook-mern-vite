const express = require("express");
const tokenChecker = require("../middleware/tokenChecker");


const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);
router.get("/id", tokenChecker, UsersController.getId);

module.exports = router;
