const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  forename: { type: String },
  surname: { type: String}, 
  username: {type: String},
  dob: {type: Date},
  description: {type: String},
  location: {type: String} // Something we can look into afterwards
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
