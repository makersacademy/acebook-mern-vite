const User = require("../models/user");

const create = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const fullName = req.body.fullName;
  const profilePicture = req.body.profilePicture;

  const user = new User({ email, password, fullName, profilePicture });
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

const getProfile = async (req, res) => {
  const userId = req.user_id;

  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const UsersController = {
  create: create,
  getProfile: getProfile,
};

module.exports = UsersController;
