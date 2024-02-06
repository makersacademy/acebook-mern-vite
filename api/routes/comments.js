// api/routes/comments.js

const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments.js");

router.get("/:postId", CommentsController.getAllCommentsByPostID);
router.post("/", CommentsController.submitComment);
router.delete("/:id", CommentsController.deleteComment);
router.put("/:id", CommentsController.editComment);

module.exports = router;
