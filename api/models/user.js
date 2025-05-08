const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: {type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // friends: { type: Array, required: false },
  // createdAt: { type: Date, required: true }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;