// const User = require("../models/user");
// const { generateToken } = require("../lib/token");

// const createToken = async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   const user = await User.findOne({ email: email });
//   if (!user) {
//     console.log("Auth Error: User not found");
//     res.status(401).json({ message: "User not found" });
//   } else if (user.password !== password) {
//     console.log("Auth Error: Passwords do not match");
//     res.status(401).json({ message: "Password incorrect" });
//   } else {
//     const token = generateToken(user.id);
//     res.status(201).json({ token: token, message: "OK" });
//   }
// };

// const signup = async (req, res) => {
//   const { firstName, lastName, email, password, DOB } = req.body;

//   try {
//     // Check if user with the same email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User with this email already exists' });
//     }

//     // Create a new user record
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password, // You may want to hash the password here before saving to the database
//       DOB
//     });

//     // Save the user record to the database
//     await newUser.save();

//     // Generate token for the newly created user
//     const token = generateToken(newUser.id);

//     // Respond with success message and token
//     res.status(201).json({ token, message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error signing up:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// const AuthenticationController = {
//   createToken,
//   signup
// };

// module.exports = AuthenticationController;
const bcrypt = require('bcrypt');
const User = require("../models/user");
const { generateToken } = require("../lib/token");

const createToken = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Auth Error: User not found");
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Auth Error: Passwords do not match");
      return res.status(401).json({ message: "Password incorrect" });
    }

    const token = generateToken(user.id);
    res.status(201).json({ token, message: "OK" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const signup = async (req, res) => {
  const { firstName, lastName, email, password, DOB } = req.body;

  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create a new user record
    const newUser = new User({
      firstName,
      lastName,
      email,
      password, // Password will be hashed by the pre-save hook in the User model
      DOB
    });

    // Save the user record to the database
    await newUser.save();

    // Generate token for the newly created user
    const token = generateToken(newUser.id);

    // Respond with success message and token
    res.status(201).json({ token, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const AuthenticationController = {
  createToken,
  signup
};

module.exports = AuthenticationController;