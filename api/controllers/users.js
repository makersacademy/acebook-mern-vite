const User = require("../models/user");

const bcrypt = require("bcrypt");

const create = async(req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
   bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      const user = new User({ email, password: hash });
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
    });
  });
}
const UsersController = {
      create: create,
    };

    module.exports = UsersController;