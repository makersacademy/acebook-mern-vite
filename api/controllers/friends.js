const User = require("../models/user");
const { generateToken } = require("../lib/token");

async function addFriend(req, res) {
  try{
    const user = await User.findById(req.user_id)
    const friend = await User.findById(req.query.userId)
    if (user.friends.includes(friend._id)) {
      res.status(500).json({ message: "User is already friends", error: err.message})
    }
    user.friends.push(friend)
    await user.save()
    const token = generateToken(req.user_id);
    res.status(200).json({ message: "Friend added", token: token });
  } catch (err) {
    const token = generateToken(req.user_id);
    res.status(500).json({ message: "Can not add friend", error: err.message, token: token})
  }
}

async function getFriends(req, res) {
  try {
    const token = generateToken(req.user_id); 
    const user = await User.findById(req.user_id).populate('friends', 'email username firstName lastName gender birthday');
    const friends = user.friends
    res.status(200).json({ friends: friends, token: token });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  };
}

async function getNonFriendUsers(req, res) {
  try {
    const token = generateToken(req.user_id); 
    const user = await User.findById(req.user_id).populate('friends', 'email username firstName lastName gender birthday');
    const friends = user.friends
    friends.push(user)
    const users = await User.find({_id: { $nin: friends }})
    res.status(200).json({ users: users, token: token });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  };
}

const FriendsController = {
  addFriend,
  getFriends,
  getNonFriendUsers
};

module.exports = FriendsController;
