const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile");

router.get("/", ProfileController.getUser);
router.post("/", ProfileController.update);
router.get("/users", ProfileController.getUsers);
router.post(`/:id/friend`, ProfileController.addFriend)
module.exports = router;