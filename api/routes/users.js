const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);

// router.get('/profile', UsersController.getUserProfile);

module.exports = router;
