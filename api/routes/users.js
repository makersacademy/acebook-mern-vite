const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.get("/", UsersController.getAllUsers);
router.get("/:user_id", UsersController.getUserById);
router.put("/:recipient", UsersController.sendFriendRequest);
router.post("/", UsersController.create);

module.exports = router;
