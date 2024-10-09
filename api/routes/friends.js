const express = require("express");
const router = express.Router();

const Friendscontroller = require("../controllers/friends");

router.post("/", Friendscontroller.addFriend); 
router.get("/", Friendscontroller.getFriends)
router.get("/non", Friendscontroller.getNonFriendUsers)
module.exports = router;
