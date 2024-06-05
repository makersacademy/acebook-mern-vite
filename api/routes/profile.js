const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile");

// router.post("/", ProfileController.createProfile);
router.get("/", ProfileController.getMyProfile);

module.exports = router;
