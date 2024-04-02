const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String },
  profilePicture: { type: String, required: false },
});

const User = mongoose.model("User", UserSchema);

// new User({
//   email: "tester@test.com",
//   password: "test123",
//   fullName: "Tester",
//   profilePicture: "/path/picture",
// }).save();

module.exports = User;
