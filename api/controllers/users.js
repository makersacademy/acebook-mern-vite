const User = require("../models/user");

const create = (req, res) => {
  const email = req.body.email.toLowerCase();
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
      if (err.code === 11000) {
        res.status(409).json({ message: "User already exists" });
        return;
      }
      res.status(400).json({ message: "Something went wrong" });

    });
};

const UsersController = {
  create: create,
};

module.exports = UsersController;
