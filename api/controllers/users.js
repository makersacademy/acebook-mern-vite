const User = require("../models/user");

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

const getUsersForLeaderboard = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users: users });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Something went wrong" });
  }
}

const addToUserScore = async (req, res) => {
  const email = req.body.email;
  const score = req.body.score;

  const user = await User.findOne({ email: email });
  if (user) {
    console.log("old score: " + user.score)
    user.score += score;
    console.log("new score: " + user.score)
    await User.findOneAndUpdate({ email: email }, user)
    res.status(200).json({ message: "Score updated" })
  } else {
    res.status(400).json({ message: "User not found" });
  }
}

const UsersController = {
  create: create,
  getUsersForLeaderboard: getUsersForLeaderboard,
  addToUserScore: addToUserScore
};

module.exports = UsersController;
