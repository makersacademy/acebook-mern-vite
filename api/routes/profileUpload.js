const express = require("express");
const router = express.Router();

const { upload, uploadMiddleware } = require("../controllers/profileUpload");

router.post('/', uploadMiddleware.single('profilepicture'), upload);

module.exports = router;