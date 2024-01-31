const express = require("express");
const UsersController = require("../controllers/users");
const multerUpload = require('../middleware/multerConfig')



const router = express.Router();
router.post("/", UsersController.create);
router.get("/:username", UsersController.getUser);
router.post("/:username/upload", multerUpload.single('file'), UsersController.uploadImage);
module.exports = router;
