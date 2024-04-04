// models/comment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for comments
const CommentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  owner_id: String

});

// Create model for comments collection
const Comment = mongoose.model('Comment', CommentSchema);


module.exports = Comment;

