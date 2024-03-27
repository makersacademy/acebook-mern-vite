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

const UsersController = {
  create: create,
};

module.exports = UsersController;
