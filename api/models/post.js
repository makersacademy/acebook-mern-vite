const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.

const CommentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: "User" },
  message: String,
});

const PostSchema = new mongoose.Schema({
  message: String,
  user_id: { type: mongoose.Types.ObjectId, ref: "User" },
  imageUrl: String,
  comments: [CommentSchema],
});

// We use the Schema to create the Post model. Models are classes which we can
// use to construct entries in our Database.
const Post = mongoose.model("Post", PostSchema);

// These lines will create a test post every time the server starts.
// You can delete this once you are creating your own posts.
const dateTimeString = new Date().toLocaleString("en-GB");
new Post({ message: `Test message, created at ${dateTimeString}` }).save();

module.exports = Post;
