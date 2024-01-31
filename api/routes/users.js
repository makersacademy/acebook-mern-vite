const express = require("express");

const UsersController = require("../controllers/users");

const multer = require("../middleware/fileUpload");

const router = express.Router();

router.post("/", multer, UsersController.create);


router.post('/upload', multer, (req, res) => {
  res.json({ message: 'File uploaded successfully.' });
});


module.exports = router;