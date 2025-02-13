const User = require("../models/user");

async function create(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = new User({ email, password });
    const savedUser = await user.save();
    console.log("User created, id:", savedUser._id.toString());
    res.status(201).json({ message: "OK" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Something went wrong" })
  }
}
const UsersController = {
  create: create,
};

module.exports = UsersController;
