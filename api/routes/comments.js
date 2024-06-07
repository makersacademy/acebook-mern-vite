const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/comments");
const tokenChecker = require("../middleware/tokenChecker");

router.get("/posts/:postId/comments", tokenChecker, CommentController.getPostComments);
router.post("/", tokenChecker, CommentController.createComment);
router.post("/:id/like", tokenChecker, CommentController.likeComment);
router.post("/:id/unlike", tokenChecker, CommentController.unlikeComment);


module.exports = router;
