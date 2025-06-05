const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false}] // might need reviewing
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
