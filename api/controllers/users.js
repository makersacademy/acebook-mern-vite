const User = require("../models/user");
const mongoose = require("mongoose");
const { generateToken } = require("../lib/token");

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



const getUserProfile = async (req, res) =>{
  const users = await User.find({_id: req.user_id});
  const token = generateToken(req.user_id);
  res.status(200).json({ users:users, token:token });
};


const update = async (req, res) => {
  const { forename, surname, username, dob, description, location } = req.body;

  console.log("this is the id", req.user_id)

  try {
    const user = await User.findById(req.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.forename = forename;
    user.surname = surname;
    user.username = username;
    user.dob = dob;
    user.description = description;
    user.location = location;

    await user.save();
    
    console.log("Updated user id:", user._id.toString());
    const newToken = generateToken(req.user_id);
    res.status(201).json({ message: "OK", token: newToken });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

    // // const user = new User({ email, password });
//   User.findOneAndUpdate({ _id: req.user_id }, { forename: forename, surname: surname, username: username, dob: dob, descripton: description, location: location }).save()
//   // user
//   //   .save()
//     .then((user) => {
//       console.log("Updated user id:", user._id.toString());
//       const newToken = generateToken(req.user_id);
//       res.status(201).json({ message: "OK", token: newToken});
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(400).json({ message: "Something went wrong" });

//     });
// };

const UsersController = {
  create: create,
  update: update,
  getUserProfile: getUserProfile,
};
module.exports = UsersController;
