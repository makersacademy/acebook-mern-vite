const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true},
  password: { type: String, required: true },
  forename: { type: String, default: "No forename added" },
  surname: { type: String, default: "No surname added" }, 
  username: {type: String, default: "No username added"},
  dob: {type: Date, default:"No dob added"},
  description: {type: String, default: "No description added"},
  location: {type: String, default: "No location added"} // Something we can look into afterwards
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
