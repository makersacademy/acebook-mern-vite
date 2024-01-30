const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile");

router.get("/", ProfileController.getAllUsers);

module.exports = router;