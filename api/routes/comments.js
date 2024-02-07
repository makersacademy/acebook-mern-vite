const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.get("/:id", CommentsController.getAllComments);
router.post("/:id", CommentsController.createComment);
router.delete("/:id", CommentsController.deleteComment);
router.post(`/update/:id`, CommentsController.updateComment)

module.exports = router;
