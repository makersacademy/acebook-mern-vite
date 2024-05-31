const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.get("/find/:id", UsersController.getUserById);
router.post("/", UsersController.create);

module.exports = router;
