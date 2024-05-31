const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);
router.post("/users", UsersController.create);
module.exports = router;
