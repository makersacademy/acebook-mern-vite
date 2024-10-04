const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const PostSchema = new mongoose.Schema({
  message: String,
  user: String, // added user as a string
  // user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: false},
});

const Post = mongoose.model("Post", PostSchema);

const dateTimeString = new Date().toLocaleString("en-GB");
// new Post({ message: `Test message, created at ${dateTimeString}`, user: "spoofed on startup" }).save();

module.exports = Post;
