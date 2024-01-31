const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();
console.log("Routes line 6")
router.post("/", UsersController.create);
router.get("/:username", UsersController.getUser);
console.log("Routes line 9")
module.exports = router;
