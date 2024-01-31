const express = require("express");

const UsersController = require("../controllers/users");

const multer = require("../middleware/fileUpload");

const router = express.Router();

//router.post("/", multer, UsersController.create);
router.get("/:id", UsersController.getUser);

router.post("/upload", multer.single("profile_pic"), (req, res) => {
  res.json({ message: "File uploaded successfully." });
});

module.exports = router;
