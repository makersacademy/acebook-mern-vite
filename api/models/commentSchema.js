const mongoose = require ("mongoose");

const commentSchema = new mongoose.Schema ({
    userName: String, 
    comment: String,
}, { timestamps: true });

module.exports = commentSchema;