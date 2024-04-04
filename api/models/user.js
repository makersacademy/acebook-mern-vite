const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  profilePicture: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

// new User({
//   email: "tester@test.com",
//   password: "test123",
//   fullName: "Tester",
//   profilePicture: "/path/picture",
// }).save();

module.exports = User;
