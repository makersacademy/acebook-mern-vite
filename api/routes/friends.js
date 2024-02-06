const express = require("express");
const FriendsController = require("../controllers/friends");

const router = express.Router();

// Route to handle befriending another user
router.post("/:id/befriend", FriendsController.befriend);

// Route to handle unfriending another user
router.post("/:id/unfriend", FriendsController.unfriend);

module.exports = router;
