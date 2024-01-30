const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);
router.get("/user/:username", UsersController.getUser);

module.exports = router;
