const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");
const CommentsController = require("../controllers/comment");

router.get("/", PostsController.getAllPosts);
router.get("/profile", PostsController.getProfilePosts);
router.post("/", PostsController.createPost);
router.post("/:postId/comment", CommentsController.createComment);
router.get("/:postId/comment", CommentsController.getAllComments);

module.exports = router;
