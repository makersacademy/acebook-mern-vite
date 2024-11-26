const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    approved: { type: Boolean, default: false, required: true},
    timestamp: Date
});

const Friend = mongoose.model("Friend", FriendSchema);

module.exports = Friend;
