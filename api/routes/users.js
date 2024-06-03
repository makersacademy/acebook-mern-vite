const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.get("/:user_id", UsersController.getUserById);
router.post("/", UsersController.create);

module.exports = router;
