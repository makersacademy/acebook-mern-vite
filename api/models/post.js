const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.

const PostSchema = new mongoose.Schema(
  {
    user: String, // added user as a string
    userPic : String, // added userPic as string to post model
    message: { type: String },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);


module.exports = Post;
