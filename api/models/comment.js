// api/models/comment.js

const mongoose = require("mongoose");

const CommentSchema =  new mongoose.Schema({
    message: String,
    user_id: mongoose.Schema.Types.ObjectId,
});

const Comment =  mongoose.model("", CommentSchema)

module.exports = Comment;