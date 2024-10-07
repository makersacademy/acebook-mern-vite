const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.

// const PostSchema = new mongoose.Schema({
//   user: String, // added user as a string
//   message: { type: String,},  
//     }, 
//     { timestamps: true } 
// ); 

const PostSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  likes: {
    count: 0, // counts number of likes
    liked_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // array of user_ids. type and ref tell mongoose the relationship with User model
  },
  author: {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' },
    required: true
  }
}, { timestamps: true }
); 


const Post = mongoose.model("Post", PostSchema);

const dateTimeString = new Date().toLocaleString("en-GB");
// new Post({ message: `Test message, created at ${dateTimeString}`, user: "spoofed on startup" }).save();
// These lines will create a test post every time the server starts.
// You can delete this once you are creating your own posts.
// const dateTimeString = new Date().toLocaleString("en-GB");
// new Post({ message: `Test message, created at ${dateTimeString}` }).save();



module.exports = Post;
