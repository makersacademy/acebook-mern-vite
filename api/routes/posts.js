const express = require("express");
const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker")

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.post("/", PostsController.createPost);
router.patch("/", tokenChecker, PostsController.updatePost);

module.exports = router;
