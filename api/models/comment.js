// models/comment.js
const mongoose = require('mongoose');

// Define schema for comments
const CommentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  owner_id: String

});

// Create model for comments collection
const Comment = mongoose.model('Comment', CommentSchema);


module.exports = Comment;

