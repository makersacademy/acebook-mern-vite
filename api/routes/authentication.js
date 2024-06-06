const express = require("express");
const router = express.Router();

const AuthenticationController = require("../controllers/authentication");

router.post("/", AuthenticationController.createToken);
router.post('/signup', AuthenticationController.signup);
router.post('/tokens', AuthenticationController.createToken); 
// Login route


// Update user route

module.exports = router;
