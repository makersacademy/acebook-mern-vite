const mongoose = require("mongoose");
const User = require('./user')


// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const PostSchema = new mongoose.Schema({
  message: { type: String, required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  likes: { type: Number, default: 0, required: true },
  createdDate: { type: Date, default: Date.now, required: true },
  modifiedDate: { type: Date, default: Date.now, required: true }
});

// We use the Schema to create the Post model. Models are classes which we can
// use to construct entries in our Database.
const Post = mongoose.model("Post", PostSchema);

// These lines will create a test post every time the server starts.
// You can delete this once you are creating your own posts.
// const dateTimeString = new Date().toLocaleString("en-GB");

module.exports = Post;
