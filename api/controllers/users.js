const Bcrypt = require("bcrypt");
const User = require("../models/user");

function create(req, res) {
  const name = req.body.name;
  const birthday = req.body.birthday;
  const email = req.body.email;
  const username = req.body.username;
  const password = Bcrypt.hashSync(req.body.password, 10);

  // console.log(`Name: ${name}, Birthday: ${birthday}, Email: ${email}, Username: ${username}, Password: ${password}`)

  const user = new User({ name, birthday, email, username, password });
  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      const errorType = Object.keys(err.keyValue);
      res.status(400).json({ message: errorType[0] });
    });
}

const UsersController = {
  create: create,
};

module.exports = UsersController;
