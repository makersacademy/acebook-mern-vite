const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/", UsersController.getUserProfile);
router.post("/", UsersController.create);

module.exports = router;
