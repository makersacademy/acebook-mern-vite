const mongoose = require("mongoose");
// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const PostSchema = new mongoose.Schema({
  message: String,
  date: { type: Date, default: Date.now},
  // numOfLikes: Number,
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});
// We use the Schema to create the Post model. Models are classes which we can
// use to construct entries in our Database.
const Post = mongoose.model("Post", PostSchema);
// These lines will create a test post every time the server starts.
// You can delete this once you are creating your own posts.
module.exports = Post;


// const PostSchema = new mongoose.Schema({
//   // date : String,
//   // message: String,
//   // numOfLikes : Number,
//   // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
//   date: { type: Date, default: Date.now },
//   message: { type: String, required: true },
//   numOfLikes: { type: Number, default: 0 },
//   user: {
//     id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     firstName: String,
//     lastName: String,
//     profilePic: String
//   }
// });