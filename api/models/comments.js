const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const CommentSchema = new mongoose.Schema(
  {
    post_id: { type: mongoose.Schema.ObjectId, ref: "Post" },

    user: { type: String },

    comment: { type: String },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);


module.exports = Comment;
