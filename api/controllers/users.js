const User = require("../models/user");
const { generateToken } = require("../lib/token");
const Post = require("../models/post");

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
      if (process.env.NODE_ENV !== 'test') {
        console.error(err);
      }
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
    const user = await User.findById(req.params.id).select("name location bio dob status friends");

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
    // Authorisation check: user can only update their own profile
    if (req.user_id !== req.params.id) {
      return res.status(403).json({ message: "Unauthorised: You can only update your own profile" });
    }

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

async function addFriend(req, res) {
  try {
    const userId = req.user_id; // From JWT
    const { myId, friendId } = req.params; // From routes

    if (userId !== myId) {
      return res.status(403).json({ message: "Stop! You may only add friends to your own account!" });
    }
    
    const friendExists = await User.findById(friendId);
    if (!friendExists) {
      return res.status(404).json({ message: "Friend not found" });
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } }, // $addToSet prevents duplicates
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ 
      message: "Friend added successfully",
      user: updatedUser
    });
    
  } catch (error) {
    res.status(500).json({ 
      message: "Error adding friend", 
      error: error.message 
    });
  }
}

async function deleteUserById(req, res) {
  try {
    const userId = req.user_id;
    await Post.deleteMany({ userId });

    if (req.user_id !== req.params.id) {
      return res.status(403).json({
        message: "Cannot perform this action"
      })
    }

    await User.updateMany(
      { friends: userId },
      { $pull: { friends: userId }}
    );

    await Post.updateMany(
      {},
      { $pull: { comments: { userId } } }
    )
    
    // Will have to check if comments exist as entities on the 
    // Post model or not or if we need to seperately delete comments & likes

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: `Account has successfully been deleted`
    })

  } catch (error) {
    res.status(500).json({
      message: "Error deleting account",
      error: error.message
    });
  }
}


const UsersController = {
  create: create,
  getAllUsers: getAllUsers,
  getById: getById,
  updateUser: updateUser,
  addFriend: addFriend,
  deleteUserById: deleteUserById
};

module.exports = UsersController;
