const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true},
  password: { type: String, required: true },
  forename: { type: String, default: "Sam" },
  surname: { type: String, default: "Jones" }, 
  username: {type: String, default: "Samo1234"},
  dob: {type: Date, default:"1990-01-01T00:00:00.000+00:00"},
  description: {type: String, default: "Likes cats"},
  location: {type: String, default: "Cardiff"} // Something we can look into afterwards
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
