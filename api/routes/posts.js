const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.post("/", (req, res) => {
    if (req.body.likes) {
    // If the request contains a "likes" property, handle the addLikesToPostByPostIdUserId action
    PostsController.addLikesToPostByPostIdUserId(req, res);
    } else {
    // Otherwise, handle the createPost action
    PostsController.createPost(req, res);
    }
});

module.exports = router;

