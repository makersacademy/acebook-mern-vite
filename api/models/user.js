const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: {type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  following: { type: Array, required: true },
  // createdAt: { type: Date, required: true }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;