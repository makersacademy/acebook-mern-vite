const User = require("../models/user");

const create = (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({ username, email, password });
  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });
    });
};

const getAllUsers = async (req, res) => {
  const users = await users.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ users: users, token: token });
};

const UsersController = {
  create: create,
  // getAllUsers: getAllUsers,
};

module.exports = UsersController;
