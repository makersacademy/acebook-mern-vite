const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String},
  profilePicture: { type: String, required: false },
});

const User = mongoose.model("User", UserSchema);

new User({ email : "beearl@btinternet.com",
          password: "Abc123",
          fullName:'TestBen',
          profilePicture:"https://example.com/image.jpg",
          }).save();

module.exports = User;