const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const CommentSchema = new mongoose.Schema({
  message: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  likes:{ type: Number, default: 0},
  createdDate: { type: Date, default: Date.now, required: true },
  modifiedDate: { type: Date, default: Date.now, required: true }
});

// We use the Schema to create the Post model. Models are classes which we can
// use to construct entries in our Database.
const Comment = mongoose.model("Comment", CommentSchema);

// These lines will create a test post every time the server starts.
// You can delete this once you are creating your own posts.

module.exports = Comment;
