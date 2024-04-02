const bcrypt = require("bcryptjs");
const User = require("../models/user");

const { generateToken } = require("../lib/token");

const getUser = async (req, res) => {
  const user = await User.find({ _id: req.user_id });
  const token = generateToken(req.user_id);
  res.status(200).json({ user: user, token: token });
};




const create = async (req, res) => {
  const { firstName, lastName, bio, email, password } = req.body;


  try {
    const secret = "Awe5some$!";
    const hashedPassword = await bcrypt.hash(password + secret, 10);


    const user = new User({ firstName, lastName, bio, email, password: hashedPassword });
    await user.save();


    console.log("User created, id:", user._id.toString());
    res.status(201).json({ message: "OK" });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

const UsersController = {
  create: create,
  getUser: getUser,
};


module.exports = UsersController;




