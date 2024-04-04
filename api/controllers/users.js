const User = require("../models/user");
const { generateToken } = require("../lib/token");

const create = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({ email, password });
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


const getUserProfile = async (req, res) =>{
  const users = await User.find({_id: req.user_id});
  const token = generateToken(req.user_id);
  res.status(200).json({ users:users, token:token });
};

const UsersController = {
  create: create,
  getUserProfile: getUserProfile
};
module.exports = UsersController;
