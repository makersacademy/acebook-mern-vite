const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true 
  },
  username: {
    type: String,
    required: true 
  },
  imgURL: {
    type: String,
    default: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    required: false
  } // added imgURL to User model
},
{timstamps: true}
);

const User = mongoose.model("User", UserSchema);

module.exports = User;


