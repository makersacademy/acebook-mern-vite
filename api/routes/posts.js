const express = require("express");
const multerUpload = require("../middleware/multerConfig");

const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.post("/", multerUpload.single("file"), PostsController.createPost);
router.post("/likes", PostsController.likePost);
router.post("/:postId/comments", PostsController.postComment);
router.delete("/:postId", PostsController.deletePost);

module.exports = router;
