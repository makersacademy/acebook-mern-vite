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
  user: String, // added user as a string
  userPic : String, // added userPic as string to post model
  likes: {
    count: { 
      type: Number,
      default: 0 
    },
    // liked_by: []
    liked_by: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Array of user ids who liked the post
      } 
    ]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Referencing the User model
    required: true
  }
}, { timestamps: true });


const Post = mongoose.model("Post", PostSchema);


module.exports = Post;
