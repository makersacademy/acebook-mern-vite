const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.post("/", PostsController.createPost);
router.get("/:postId", PostsController.getPostById);
router.get('/feed/:userId', PostsController.getFeed);

module.exports = router;
