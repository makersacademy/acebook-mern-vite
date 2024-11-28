const User = require("../models/user");
const { generateToken } = require("../lib/token");

function create(req, res) {
  // const payload = JSON.parse(req.body)
  // console.log(payload)
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  // const image = req.body.image;

  const user = new User({ firstName, lastName, email, password });
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
  console.log("line 27.....", req.user_id)
  const user = await User.find({ _id: req.user_id });
  console.log("User.....", user)
  const token = generateToken(req.user_id);

  const returnUserData = {
    firstName: user[0].firstName,
    lastName: user[0].lastName,
  }
  res.status(200).json({ userData: returnUserData, token: token });
}

const UsersController = {
  create: create,
  getUserProfile: getUserProfile
};

module.exports = UsersController;
