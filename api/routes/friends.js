// api/routes/friends.js

const express = require("express");
const router = express.Router();

const FriendsController = require("../controllers/friends.js");

// "/:userId/friendStatus"
router.get("/:id/friendStatus", FriendsController.getFriendStatus);

// Route to handle befriending another user
router.post("/:id/befriend", FriendsController.befriend);

// Route to handle unfriending another user
router.post("/:id/unfriend", FriendsController.unfriend);

module.exports = router;
