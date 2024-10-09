const express = require("express");
const router = express.Router();

const Friendscontroller = require("../controllers/friends");

router.post("/", Friendscontroller.addFriend); 
router.post("/accept", Friendscontroller.acceptFriendRequest)
router.get("/", Friendscontroller.getFriends)
router.get("/non", Friendscontroller.getNonFriendUsers)
router.get("/requests", Friendscontroller.getFriendRequests)
module.exports = router;
