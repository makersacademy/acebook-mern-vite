const express = require('express');
const profilesController = require('../controllers/profiles');

const router = express.Router();

router.get('/profile', profilesController.getProfile);

module.exports = router;