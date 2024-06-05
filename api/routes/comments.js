const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

// Fetch comments for a specific post
router.get("/posts/:postId/comments", CommentsController.getPostComments);

// Create a new comment for a specific post
router.post("/", CommentsController.createComment);

module.exports = router;
