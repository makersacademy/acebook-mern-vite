const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const PostSchema = new mongoose.Schema({
  message: String,
  owner_id: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  image: { type: String, required: false },
  post_date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
});



// We use the Schema to create the Post model. Models are classes which we can
// use to construct entries in our Database.
const Post = mongoose.model("Post", PostSchema);

// These lines will create a test post every time the server starts.
// You can delete this once you are creating your own posts.
const dateTimeString = new Date().toLocaleString("en-GB");
new Post({ message: `Test message, created at ${dateTimeString}`, owner_id:"12234567890abcdefg" }).save();

module.exports = Post;
