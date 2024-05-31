const express = require('express');
const router = express.Router();
const validatePassword = require('./passValidator');

router.post('/validate', (req, res) => {
  const { password } = req.body;
  const isValid = validatePassword(password);
  if (isValid) {
    res.status(200).json({ message: 'Password is valid' });
  } else {
    res.status(400).json({ message: 'Password must be at least 7 characters long, contain one uppercase letter, and one of {!$%&}' });
  }
});

module.exports = router;