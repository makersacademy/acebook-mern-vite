const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.get("/user", PostsController.getPostByUser);
router.post("/", PostsController.createPost);

module.exports = router;
