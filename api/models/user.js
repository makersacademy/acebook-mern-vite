// // const mongoose = require("mongoose");

// // const UserSchema = new mongoose.Schema({
// //   firstName: { type: String, required: true },
// //   lastName: { type: String, required: true },
// //   email: { type: String, required: true },
// //   password: { type: String, required: true },
// //   DOB: { type: Date, required: true },
// //   gender: { type: String, required: true },

// // });

// // const User = mongoose.model("User", UserSchema);

// // module.exports = User;

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const UserSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   DOB: {
//     type: Date,
//     required: true,
//   },
//   gender: {
//     type: String,
//     required: true,
//   },
// });

// Hash the password before saving the user
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;