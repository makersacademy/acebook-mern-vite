const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.get(`/find/:id`, PostsController.getSinglePost)
router.post("/", PostsController.createPost);
router.delete(`/find/:id`, PostsController.deletePost)

module.exports = router;
