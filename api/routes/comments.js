const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.get("/", CommentsController.getPostComments);
router.post("/", CommentsController.createComment);

module.exports = router;