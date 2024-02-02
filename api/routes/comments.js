// api/routes/comments.js

const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.get("/:commentId", CommentsController.getAllComments);
router.post("/", CommentsController.submitComment);

module.exports = router;