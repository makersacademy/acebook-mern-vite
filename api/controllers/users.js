const User = require("../models/user");

function create(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const user = new User({ email, password, name });
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

async function getAllUsers(req, res) {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error retrieving all users in getAllUsers func", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getById(req, res) {
  try {
    const user = await User.findById(req.params.id).select("name");
    console.log("this is my nameeeeee:", user)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error retrieving user by id in getById func", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateUser(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {new: true}
    );

    if (!updatedUser) {
      return res.status(400).json({message: "Could not update user information"})
    }

    res.status(200).json({updatedUser})

  } catch (error) {
    console.error("Error with updating the user via updateUser func", error)
    res.status(500).json({message: "Server error"})
  }
}

const UsersController = {
  create: create,
  getAllUsers: getAllUsers,
  getById: getById,
  updateUser: updateUser
};

module.exports = UsersController;
