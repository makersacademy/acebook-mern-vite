// api/routes/comments.js

const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments.js");

router.get("/:postId", CommentsController.getAllCommentsByPostID);
router.post("/", CommentsController.submitComment);

module.exports = router;
