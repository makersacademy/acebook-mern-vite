const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.

// const PostSchema = new mongoose.Schema({
//   user: String, // added user as a string
//   message: { type: String,},  
//     }, 
//     { timestamps: true } 
// ); 

// Define the schema for the Post model
const PostSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  likes: {
    count: { 
      type: Number,
      default: 0 
    },
    // liked_by: []
    liked_by: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Array of user ids who liked the post
    ]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Referencing the User model
    required: true
  }
}, { timestamps: true });


const Post = mongoose.model("Post", PostSchema);

const dateTimeString = new Date().toLocaleString("en-GB");
// new Post({ message: `Test message, created at ${dateTimeString}`, user: "spoofed on startup" }).save();
// These lines will create a test post every time the server starts.
// You can delete this once you are creating your own posts.
// const dateTimeString = new Date().toLocaleString("en-GB");
// new Post({ message: `Test message, created at ${dateTimeString}` }).save();



module.exports = Post;
