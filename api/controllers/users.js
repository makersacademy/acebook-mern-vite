const User = require("../models/user");
const slugify = require("../lib/slugify");
const { generateToken } = require("../lib/token");

const create = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const fullname = req.body.fullname
  const slug = slugify(fullname)

  const user = new User({fullname, email, password, slug });
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

const getUserById = async (req, res) => {
  // const user_id = req.query.user_id;
  // const user = await User.findOne( {_id: user_id});
  const users = await User.find()
  const token = generateToken(req.user_id);
  res.status(200).json({ users: users, token: token });
};

const UsersController = {
  create: create,
  getUserById: getUserById
};

module.exports = UsersController;
