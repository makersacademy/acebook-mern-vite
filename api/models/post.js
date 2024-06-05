const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  parent: String,
  message: String,
  date: Date,
  like_array: Array,
  email: { type: String }
});

const Post = mongoose.model("Post", PostSchema);

const dateTimeString = new Date().toLocaleString("en-GB");
new Post({ message: `Test message, created at ${dateTimeString}` }).save();

module.exports = Post;
