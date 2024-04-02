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

const update = (req, res) => {
  const forename = req.body.forename;
  const surname = req.body.surname;
  const username = req.body.username;
  const dob = req.body.dob;
  const description = req.body.description;
  const location = req.body.location;

  console.log("this is the id", req.user_id)

// const user = new User({ email, password });
  User.findOneAndUpdate({ _id: req.user_id }, { forename: forename, surname: surname, username: username, dob: dob, descripton: description, location: location })
  // user
  //   .save()
    .then((user) => {
      console.log("Updated user id:", user._id.toString());
      const newToken = generateToken(req.user_id);
      res.status(201).json({ message: "OK", token: newToken});
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });

    });
};

const UsersController = {
  create: create,
  update: update,
};

module.exports = UsersController;
