const User = require("../models/user");
const { generateToken } = require("../lib/token");

const getUser = async (req, res) => {
    //console.log("Get user by holly")
    const token = generateToken(req.user_id);
    //const users = await User.find({ _id: req.user_id});
    const users = await User.aggregate([
        {$addFields: {
            convertedId: {$toString: "$_id"}
        }},
        {$match: {
            convertedId: req.user_id
        }},
        {$lookup: {
            from: "users",
            localField: "friends",
            foreignField: "_id",
            as: "friendArray"
        }}
    ])
    res.status(200).json({users: users, token: token});
    
}

const update = async (req, res) => {
    //console.log("Updating by holly")
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const profilePic = req.body.profilePic;
    

    const user = await User.findOne({email:email});
    console.log(user);
    if (!user) {
        return res.status(400).json({message: "User does not exists"});
    };
    user.profilePic = profilePic;
    user.save();
    res.status(200).json({message: "ok"});
};

const getUsers = async (req, res) => {
    const users = await User.find().sort({username: 1});
    const token = generateToken(req.user_id);
    res.status(200).json({users: users, token: token});
  }

const addFriend = async (req, res) => {
    console.log("testing")
    await User.findOneAndUpdate({_id: req.user_id},{$addToSet:{friends: req.params.id}});
    const newToken = generateToken(req.user_id);
    res.status(200).json({message: "Friend added", token: newToken})
}

const ProfileController = {
    getUser: getUser,
    update: update,
    getUsers: getUsers,
    addFriend: addFriend
}

module.exports = ProfileController;