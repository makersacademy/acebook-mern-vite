const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const CommentSchema = new mongoose.Schema({
    commentMessage: {
        type: String,
        required: true, // Ensuring that a comment message is always provided
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    numOfLikes: {
        type: Number, 
        default: 0 
    },

    postId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },

    likedBy: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],

    // image: {
    //     type: String
    // }


});

// We use the Schema to create the Comment model. Models are classes which we can
// use to construct entries in our Database.
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
