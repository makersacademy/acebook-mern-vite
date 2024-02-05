const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

const logReq = (req) => {
  console.log(req);
}

router.get("/", PostsController.getAllPosts);
router.post("/", PostsController.createPost);
router.post("/like", PostsController.likePost);

module.exports = router;
