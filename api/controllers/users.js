const User = require("../models/user");
const slugify = require("../lib/slugify");
const { generateToken } = require("../lib/token");

const create = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const fullname = req.body.fullname
  const slug = slugify(fullname)

  const user = new User({fullname, email, password, slug });
  user.save()
    .then(() => {
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });
    });
};

const getUserById = async (req, res) => {
  const user_id = req.params.user_id;
  const user = await User.findById(user_id);
  // const user = await User.findOne( {_id: user_id});
  // const users = await User.find()
  const token = generateToken(req.user_id);
  res.status(200).json({ user: user, token: token });
};

const UsersController = {
  create: create,
  getUserById: getUserById
};

module.exports = UsersController;


// below is from angelica, restore profileUpdate and adapt the rest as needed

// const User = require("../models/user");
// // const slugify = require("../lib/slugify");
// const { generateToken } = require("../lib/token");

// // const createUser = (req, res) => {
// //   const email = req.body.email;
// //   const password = req.body.password;
// //   const firstName = req.body.firstName;
// //   const lastName = req.body.lastName;
// //   const slug = slugify(fullname)

// //   const user = new User({ email, password, firstName, lastName});
// //   user
// //     .save()
// //     .then((user) => {
// //       console.log("User created, id:", user._id.toString());
// //       res.status(201).json({ message: "OK", user_id: user._id.toString() });
// //     })
// //     .catch((err) => {
// //       console.error(err);
// //       res.status(400).json({ message: "Something went wrong" });
// //     });
// // };

// // not needed at the moment, but could be repurposed for finding all friends later on
// // const getAllUsers = async (req, res) => {
// //   const users = await User.find();
// //   const token = generateToken(req.user_id);
// //   res.status(200).json({ users, token });
// // };


// const createUser = async (req, res) => {
//   const user = new User(req.body);
//   await user.save(); 

//   const newToken = generateToken(req.user_id);
//   res.status(201).json({ message: "User created", token: newToken });
// };


// const getProfile = async (req, res) => {
//   const user_id = req.params.user_id;
//   try {
//     const user = await User.findById(user_id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const token = generateToken(req.user_id);
//     res.status(200).json({ message: "Profile fetched successfully", user: user , token: token });
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// const getUserById = async (req, res) => {
//   const user_id = req.params.user_id;
//   const user = await User.findById(user_id); // same as User.findOne( {_id: user_id});
//   const token = generateToken(req.user_id);
//   res.status(200).json({ user: user, token: token });
// };

// // const updateProfile = async (req, res) => {
// //   const user_id = req.params.user_id;
// // console.log(req.body)
// //   try {
// //     const user = await User.findById(user_id);
// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }
// //     const updatedUser = await User.findByIdAndUpdate(user_id, { $set: req.body}, { new: true });
    

// //     res.status(200).json({ message: "Profile updated successfully", updatedUser });
// //   } catch (error) {
// //     console.error("Error updating profile:", error);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // };

// // export const updateProfile = async (req, res, next) => 
// //      {
// //       const updatedUser = await User.findByIdAndUpdate(
// //         req.params.id,
// //         {
// //           $set: req.body,
// //         },
// //         { new: true }
// //       );
// //       res.status(200).json(updatedUser);
// //     } catch (error) {
// //       next(error);
// //     }
// //    {
// //     return next(createError(403, "You can update only your account!"));
// //   };

// const UsersController = {
//   // getAllUsers,  // not needed at the moment, but could be repurposed for finding all friends later on
//   createUser,
//   getProfile,
//   updateProfile,
// };

// module.exports = UsersController;