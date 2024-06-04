const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.get("/:parent_id", PostsController.getComments);
router.post("/", PostsController.createPost);
router.put("/", PostsController.updateLikes);

module.exports = router;
