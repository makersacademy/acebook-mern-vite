const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.get("/profile", PostsController.getProfilePosts);
router.post("/", PostsController.createPost);

module.exports = router;
