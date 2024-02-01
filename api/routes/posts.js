const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");
const multer = require("../middleware/fileUpload");
router.get("/", PostsController.getAllPosts);
router.post("/", multer.single("images"), PostsController.createPost);


module.exports = router;
