const fs = require('fs');
const path = require('path');
const multer = require('multer');
const User = require("../models/user");

// Define the correct path for the uploads directory outside the api folder
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// File upload controller 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Use the uploadsDir path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Add a timestamp to the filename
  }
});

const upload = multer({ storage: storage });

const create = async (req, res) => {
  console.log("Received body:", req.body); // Log received body
  console.log("Received file:", req.file); // Log received file

  const { firstName, lastName, email, password, DOB, gender } = req.body;
  const profilePicture = req.file ? `/uploads/${req.file.filename}` : '';

  const user = new User({ firstName, lastName, email, password, DOB, gender, profilePicture });
  try {
    await user.save();
    console.log("User created, id:", user._id.toString());
    res.status(201).json({ message: "OK" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Something went wrong", error: err.message }); // Include error message for debugging
  }
};

const UsersController = {
  create: create,
};

module.exports = UsersController;
