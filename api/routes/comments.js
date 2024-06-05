const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/comments");
const tokenChecker = require("../middleware/tokenChecker");

router.get("/posts/:postId/comments", tokenChecker, CommentController.getPostComments);
router.post("/", tokenChecker, CommentController.createComment);

module.exports = router;
