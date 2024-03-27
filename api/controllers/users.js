const User = require("../models/user");
const { generateToken } = require("../lib/token");


const getUser = async (req, res) => {
  const user = await User.find({ _id: req.user_id });
  const token = generateToken(req.user_id);
  res.status(200).json({ user: user, token: token });
};

const create = (req, res) => {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const bio = req.body.bio;
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({ firstName, lastName, bio, email, password});
  user
    .save()
    .then((user) => {
      console.log(user);
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
  getUser: getUser
};

module.exports = UsersController;




