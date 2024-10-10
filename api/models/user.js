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
    default: "https://i.guim.co.uk/img/media/98b5d04bd6657b580369ac8c30d469af1fdec172/0_0_4296_2932/master/4296.jpg?width=1300&dpr=1&s=none",
    required: false
  } // added imgURL to User model
},
{timstamps: true}
);

const User = mongoose.model("User", UserSchema);

module.exports = User;


