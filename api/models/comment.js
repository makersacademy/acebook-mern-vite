const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const CommentSchema = new mongoose.Schema({
  // fullName : {type: String, required: true},
  // profilePicture: { type: String },
  comment_text: { type: String, required: true },
  image: { type: String, required: false },
  liked: { type: Boolean, default: false },
  likeCounter: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", // Reference to the Post model
  },
});

// We use the Schema to create the Comment model. Models are classes which we can
// use to construct entries in our Database.
const Comment = mongoose.model("Comment", CommentSchema);

// const dateTimeString = new Date().toLocaleString("en-GB");
// new Comment({
//   // fullName: "Test User",
//   // profilePicture: "https://example.com/profile.jpg",
//   comment_text: "Test comment",
//   image: "https://example.com/image.jpg",
//   liked: false,
//   likeCounter: 0,
//   createdAt: new Date(),
//   user: "66018c6a7ac9ab868d6c9b63",
//   post: "66018c5c7ac9ab868d6c9b60", // Provide a valid post ID
// }).save();

module.exports = Comment;
