const User = require("../models/user");
const slugify = require("../lib/slugify");

const create = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const fullname = req.body.fullname
  const slug = slugify(fullname)

  const user = new User({fullname, email, password, slug });
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
