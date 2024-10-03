const User = require("../models/user");
const { generateToken } = require("../lib/token");

function create(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  const user = new User({ email, password, username });
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
}

// GET ALL USERS
async function getAllUsers(req, res) {
  const users = await User.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ users: users, token: token });
}

// GET CURRENT USER
async function getCurrentUser(req, res) {
  const user = await User.findById(req.user_id);
  const token = generateToken(req.user_id);
  res.status(200).json({ user: user, token: token });
}

const UsersController = {
  create: create,
  getAllUsers: getAllUsers,
  getCurrentUser: getCurrentUser
};

module.exports = UsersController;
