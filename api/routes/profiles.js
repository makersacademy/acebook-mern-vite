const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile");

router.get("/", ProfileController.getUser);
router.post("/", ProfileController.update);
module.exports = router;