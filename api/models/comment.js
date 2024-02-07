const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const CommentSchema = new mongoose.Schema(
    {
        post_id: String,
        message: String,
        user_id: String,
        reg_time: { type: Date, default: Date.now },
    },
    {
        versionKey: false, // You should be aware of the outcome after set to false
    }
);

// We use the Schema to create the Comment model. Models are classes which we can
// use to construct entries in our Database.
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
