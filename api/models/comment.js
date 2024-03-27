const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const CommentSchema = new mongoose.Schema({
    username:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User" // Reference to the User model
            },
    post:  {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post" // Reference to the Post model
            },
    message:{ type: String, required: true },
    like: { type: Number, required: false },
    image: { type: String, required: false }, 
    createdAt: {
                type: Date,
                default: Date.now
    }
});
    

// We use the Schema to create the Comment model. Models are classes which we can
// use to construct entries in our Database.
const Comment = mongoose.model("Comment", CommentSchema);

// These lines will create a test comment every time the server starts.
// You can delete this once you are creating your own posts.
const dateTimeString = new Date().toLocaleString("en-GB");
new Comment({ message: `Test comment Maria, created at ${dateTimeString}` }).save();

module.exports = Comment;