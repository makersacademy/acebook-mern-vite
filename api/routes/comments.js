const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.post("/", CommentsController.createComment);
router.get("/", CommentsController.getAllComments);

module.exports = router;
