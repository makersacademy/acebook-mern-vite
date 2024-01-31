const User = require("../models/user");

const create = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const profile_picture = req.body.profile_picture || null;

  //checks if the email is already in use
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(401).json({ message: 'Email already in use' });
  } 
  // creates a new user if the email is not in use 
  else {
    const newUser = new User({ username, email, password, profile_picture });
    newUser
      .save()
      .then((user) => {
        console.log("User created, id:", user._id.toString());
        return res.status(201).json({ message: 'User created' });
      })
      .catch((err) => {
        console.error(err);
        return res.status(400).json({ message: "Something went wrong" });
      });
    }
}

const getAllUserInfo = async (req, res) => {
  const data = await User.findbyId();
  const token = generateToken(req.user_id);
  res.status(200).json({ data: data, token: token });
};



const UsersController = {
  create: create,
  getAllUserInfo: getAllUserInfo, 
};

module.exports = UsersController;
