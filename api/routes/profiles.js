const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');
const tokenChecker = require('../middleware/tokenChecker');

router.get('/profile', tokenChecker, UsersController.getProfile);
router.get('/profile/posts', tokenChecker, UsersController.getUserPosts);

module.exports = router;
