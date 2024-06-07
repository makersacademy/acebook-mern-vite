const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  message: { type: String, required: true },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
