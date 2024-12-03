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
      console.log("I was triggered, user not saved to db")
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
    const username = req.query.username;
    try {
      if (await isUnique(username)) {
        return res.status(200).json({unique: true });
      } else {
        return res.status(200).json({ unique: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "Server error" });
    }
}

async function isUnique(username) {
  const userArray = await User.find({username: username});
  return (userArray.length === 0)
}

const UsersController = {
  create: create,
  getUserProfile: getUserProfile,
  checkUsername: checkUsername
};

module.exports = UsersController;
