const CommentsController = {
  getAllComments: getAllComments,
  createComment: createComment,
};
module.exports = CommentsController;





New
3:41
routes/comments.js////////////// const express = require("express");
const router = express.Router();
const CommentsController = require("../controllers/comments");
router.get("/", CommentsController.getAllComments);
router.post("/", CommentsController.createComment);
module.exports = router;