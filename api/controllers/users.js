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
  let profile_pic = "";
  let url =
    req.protocol +
    "://" +
    req.get("host") +
    "/uploads/default_profile_pic.svg.png";
  if (req.file) {
    profile_pic = req.file.filename;
    url = req.protocol + "://" + req.get("host") + "/uploads/" + profile_pic;
  }

  const full_name = req.body.full_name;
  const email = req.body.email;
  const password = req.body.password;

  //const url = req.protocol + "://" + req.get("host") + "/uploads/" + profile_pic;
  const user = new User({
    profile_pic: url,
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
      //console.error(err);

      if (err.name === "ValidationError") {
        res
          .status(400)
          .json({ message: "Validation failed", errors: err.errors });
      } else if (err.name === "MongoServerError") {
        console.log("Email already in use");
        res.status(409).json({ message: "Email already in use" });
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
