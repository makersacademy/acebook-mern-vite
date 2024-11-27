const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.post("/", PostsController.createPost);
router.get("/mine", PostsController.getYourPosts);
router.get("/:username", PostsController.getUserPosts);


module.exports = router;
