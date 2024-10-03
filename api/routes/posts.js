const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts); // a http get request will fetch the posts
router.post("/", PostsController.createPost); // a http post request will create the post as defined in api/controllers/posts.js

module.exports = router;
