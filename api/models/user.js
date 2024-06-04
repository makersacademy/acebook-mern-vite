const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {type: String, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  slug: {type: String, required: true},
  bio: {type: String},
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
