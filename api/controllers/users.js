const User = require("../models/user");
const { generateToken } = require("../lib/token");
const Photo = require("../models/photo")

function create(req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({ firstName, lastName, username, email, password });
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

async function getUserProfile(req, res) {
  const user = await User.find({ _id: req.user_id });
  const token = generateToken(req.user_id);

  const returnUserData = {
    firstName: user[0].firstName,
    lastName: user[0].lastName,
  }
  res.status(200).json({ userData: returnUserData, token: token });
}

async function checkUsername(req, res) {
    const {username} = req.query;

    try {
      const user = await User.findOne({username});
      if (user) {
        return res.status(200).json({ unique: false }); // Username exists
      }
      res.status(200).json({unique: true }); // Username is unique
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "Server error" });
    }
}

const UsersController = {
  create: create,
  getUserProfile: getUserProfile,
  checkUsername: checkUsername
};

module.exports = UsersController;
