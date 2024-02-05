const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.get("/:id", CommentsController.getAllComments);
router.post("/:id", CommentsController.createComment);

module.exports = router;
