const express = require("express");
const tokenChecker = require("../middleware/tokenChecker")


const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);
router.get("/", UsersController.getAllUsers);
router.get("/me", tokenChecker, UsersController.getCurrentUser); //tokenChecker to check if valid token
router.patch("/me", tokenChecker, UsersController.updateImgURL); //patch route to update existing user's profile picture

module.exports = router;
