const User = require("../models/user");
const slugify = require("../lib/slugify");
const { generateToken } = require("../lib/token");

const create = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const fullname = req.body.fullname;
  const slug = slugify(fullname);

  const user = new User({ fullname, email, password, slug });
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
  const users = await User.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ users: users, token: token });
};

const sendFriendRequest = async (req, res) => {
  const recipient = req.body.recipient;
  const sender = req.body.sender;
  const adding = req.body.adding;
  if (adding) {
    await User.findByIdAndUpdate(recipient, { $push: { friend_req: sender }});
    res.status(200).json({ message: "Sent request" });
  } else {
    await User.findByIdAndUpdate(recipient, { $pull: { friend_req: sender }});
    res.status(200).json({ message: "Removed request" });
  }
}

const getUserById = async (req, res) => {
  const user_id = req.params.user_id;
  const user = await User.findById(user_id);
  const token = generateToken(req.user_id);
  res.status(200).json({ user: user, token: token });
};

const UsersController = {
  create: create,
  getUserById: getUserById,
  getAllUsers: getAllUsers,
  sendFriendRequest: sendFriendRequest
};

module.exports = UsersController;
