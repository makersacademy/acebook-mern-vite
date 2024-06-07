const express = require("express");
const router = express.Router();

const { upload, get, uploadMiddleware } = require("../controllers/profileUpload");

router.post('/', uploadMiddleware.single('profilepicture'), upload);
router.get('/uploads/:filename', get);

module.exports = router;