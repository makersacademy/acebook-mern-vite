const User = require("../models/user");
const { generateToken } = require("../lib/token");

function create(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const imgURL = req.body.imgURL; // added imgURL field

  const user = new User({ email, password, username, imgURL }); // added imgURL argument
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

// Add an image to an existing user/update current image
async function updateImgURL(req, res) {
  const user = await User.findById(req.user_id);
  const token = generateToken(req.user_id);
  const newImgURL = req.body.imgURL; 
try {
  if (!user) {
    return res.status(404).json({ message: "Can't seem to find that user..."});
    }

user.imgURL = newImgURL;
const updatedUser = await user.save();
res.status(202).json({ message: "Image updated!", user: updatedUser.username, token: token});
} catch (err) {
  console.error(err);
  res.status(400).json({message: "Uh-oh, this is why you don't let Dewi code alone..."});
}}
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
  getCurrentUser: getCurrentUser,
  updateImgURL: updateImgURL
};

module.exports = UsersController;
