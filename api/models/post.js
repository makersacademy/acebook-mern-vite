const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  date: Date,
  numOfLikes: { type: Number, default: 0 },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  image: { type: String } 
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
