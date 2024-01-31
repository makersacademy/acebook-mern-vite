const User = require("../models/user");

const { generateToken } = require("../lib/token");

const getUser = async (req, res) => {
  const token = generateToken(req.params.id);

  User.findOne({ _id: req.params.id }).then((data) => {
    if (!data) {
      console.log(req.params.id);
      console.log("Auth Error: User not found");
      res.status(401).json({ message: "User not found" });
    } else {
      res.status(200).json({ user: data, token: token });
      //console.log(data);
      //console.log("Found user!");
    }
  });
};

const create = (req, res) => {
  const profile_pic = req.file.filename;
  const full_name = req.body.full_name;
  const email = req.body.email;
  const password = req.body.password;

  const url = req.protocol + "://" + req.get("host");
  const user = new User({
    profile_pic: url + "/uploads/" + profile_pic,
    full_name,
    email,
    password,
  });

  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res
        .status(201)
        .json({ message: "User created successfully", userId: user._id });
    })
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        res
          .status(400)
          .json({ message: "Validation failed", errors: err.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    });
};
const UsersController = {
  create: create,
  getUser: getUser,
};

module.exports = UsersController;
