const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  birthday: { type: Date, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
