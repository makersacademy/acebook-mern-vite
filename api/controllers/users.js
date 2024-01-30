const User = require("../models/user");


const { generateToken } = require("../lib/token")


const getUser = async (req, res) => {
    
    const token = generateToken(req.params.id)

    User.findOne({_id: "65b79e6d30099b1b7d50163f"})
    .then((data) => {
      if (!data) {
      console.log(req.params.id)
      console.log("Auth Error: User not found");
      res.status(401).json({ message: "User not found" });
      }   
      else {
      res.status(200).json({ user: data, token: token });
      console.log(data)
      console.log("Found user!")
    };
  });
};


const create = (req, res) => {
  const profile_pic = "";
  const full_name = req.body.full_name;
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({ profile_pic, full_name, email, password });
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
  getUser: getUser,
};

module.exports = UsersController;
