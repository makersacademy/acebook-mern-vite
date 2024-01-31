const User = require("../models/user");

const create = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const userWithEmail = await User.findOne({email: email})
  const userWithUsername = await User.findOne({username: username})

  if (userWithEmail && userWithUsername) {
    console.log("Auth Error: Username and Email already exists")
    res.status(409).json({message: "Username and Email already exist"})
  } else if (userWithEmail){
    console.log("Auth Error: Email already exists")
    res.status(409).json({message: "Email already exists"})
  } else if (userWithUsername){
    console.log("Auth Error: Username already exists")
    res.status(409).json({message: "Username already exists"})
  } else {
    const user = new User({ username, email, password });
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

};

const UsersController = {
  create: create,
};

module.exports = UsersController;
