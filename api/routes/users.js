const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/:email", UsersController.create);


module.exports = router;
