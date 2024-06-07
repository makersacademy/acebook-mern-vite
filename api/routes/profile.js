const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile");

// router.post("/", ProfileController.createProfile);
router.get("/", ProfileController.getMyProfile);
// router.put("/", ProfileController.updateMyBio);
// router.put("/", ProfileController.updateMyImage);
router.put("/", ProfileController.updateProfile);

module.exports = router;
