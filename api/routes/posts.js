const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.get("/:username", PostsController.getPostsForUser);
router.post("/", PostsController.createPost);

router.post("/like", PostsController.likePost);
router.post("/edit", PostsController.editPost);
router.delete("/:id", PostsController.deletePost);

module.exports = router;
