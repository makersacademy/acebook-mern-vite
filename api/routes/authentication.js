const express = require("express");
const router = express.Router();

const AuthenticationController = require("../controllers/authentication");

router.post("/", AuthenticationController.createToken);
router.post('/signup', AuthenticationController.signup);

// Login route
router.post('/login', AuthenticationController.createToken);

// Update user route

module.exports = router;
