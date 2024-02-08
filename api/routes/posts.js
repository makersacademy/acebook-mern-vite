const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.get(`/find/:id`, PostsController.getSinglePost)
router.get(`/find/username/:username`, PostsController.getPostsByUser)
router.post("/", PostsController.createPost);
router.delete(`/find/:id`, PostsController.deletePost)
router.post(`/find/:id`, PostsController.updatePost)
router.post(`/find/:id/like`, PostsController.likePost)

module.exports = router;
