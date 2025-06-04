const User = require("../models/user");
const { generateToken } = require("../lib/token")
const { ObjectId } = require('mongodb')

function create(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const user = new User({ email, password, name });
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

async function getAllUsers(req, res) {
  const users = await User.find();
  res.status(200).json({users});
};

async function getById(req, res) {
  const user = await User.findById(req.params._id);
  // const token = generateToken(req.user_id);

  res.status(200).json({ user });
}; // where we got up to

const UsersController = {
  create: create,
  getAllUsers: getAllUsers,
  getById: getById
};

module.exports = UsersController;
