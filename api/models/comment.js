const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const CommentSchema = new mongoose.Schema({
    user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User" // Reference to the User model
            },
    post:  {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post" // Reference to the Post model
            },
    fullName : {type: String, required: true},
    profilePicture : {type: String},
    message:{ type: String, required: true },
    image: { type: String, required: false }, 
    liked: { type: Boolean, default: false },
    likeCounter: { type: Number, default: 0 },
    createdAt: {
                type: Date,
                default: Date.now
    }
});
    

// We use the Schema to create the Comment model. Models are classes which we can
// use to construct entries in our Database.
const Comment = mongoose.model("Comment", CommentSchema);


const dateTimeString = new Date().toLocaleString("en-GB");
new Comment({ 
    user: "66018c6a7ac9ab868d6c9b63",
    post: "66018c5c7ac9ab868d6c9b60", // Provide a valid post ID
    fullName: "Test User",
    profilePicture: "https://example.com/profile.jpg",
    message: "Test comment",
    image: "https://example.com/image.jpg",
    like: 0,
    createdAt: new Date()
}).save();
module.exports = Comment;

// const Comment = require('./models/comment')