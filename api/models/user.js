const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: [true, 'Email is required'], unique: true,
    validate: {
      validator: function (email) { return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)}}},
  password: { type: String, required: [true, 'Password is required'] },
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  birthday: { type: Date, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
