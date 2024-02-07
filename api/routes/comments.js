// api/routes/comments.js

const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments.js");
const LikesController = require("../controllers/likes");

router.get("/:postId", CommentsController.getAllCommentsByPostID);
router.post("/", CommentsController.submitComment);
router.delete("/:id", CommentsController.deleteComment);
router.get("/likes/:commentId", LikesController.getAllLikesByCommentId);
router.post("/like/toggle", LikesController.addLikesToCommentByCommentIdUserId);

module.exports = router;
