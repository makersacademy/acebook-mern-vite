const User = require("../models/user");
const mongoose = require("mongoose");

mongoose.connect('mongodb://0.0.0.0/acebook', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Insert the seed data into the test database
db.once('open', async () => {
const user = User.findById('6605a0cf71e45c0eb4cec8eb')
.then((user) => {
  user.set({ forename: 'hello'}).save()
//   console.log("Updated user id:", user._id.toString());
//   const newToken = generateToken(req.user_id);
//   res.status(201).json({ message: "OK", token: newToken});
})
.catch((err) => {
  console.error(err);
//   res.status(400).json({ message: "Something went wrong" });
db.close()

});})