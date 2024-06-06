const express = require("express");
const UsersController = require("../controllers/users");
const multer = require('multer');
const path = require('path');
const router = express.Router();
const fs = require('fs');

// Define the correct path for the uploads directory
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// File upload controller setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Directory to save uploaded profile picture
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Add a timestamp to the filename
  }
});

const upload = multer({ storage: storage });

router.post("/", upload.single('profilePicture'), UsersController.create);


// Define routes
router.get('/:userId', UsersController.getUserById);
router.put('/:userId', UsersController.updateUserById);
module.exports = router;
