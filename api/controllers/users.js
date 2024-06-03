const User = require("../models/user");
const { generateToken } = require("../lib/token");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ users: users, token: token });
};

const getOneUser = async (req, res, userID) => {
  const user = await User.find(UserID);
  const token = generateToken(req.user_id);
  res.status(200).json({ users: users, token: token });
};

const create = (req, res) => {
  const forename = req.body.forename;
  const surname = req.body.surname;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({ forename, surname, username, email, password });
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

const UsersController = {
  create: create,
  getAllUsers: getAllUsers,
  getOneUser: getOneUser
};

module.exports = UsersController;
