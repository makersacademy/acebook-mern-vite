const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.get("/getUserPosts", PostsController.getUserPosts);
router.post("/", PostsController.createPost); // calls createPost from api/controllers/posts.js

module.exports = router;
