const User = require("../models/user");
const { generateToken } = require("../lib/token");

const getUser = async (req, res) => {
    console.log("Get user by holly")
    const token = generateToken(req.user_id);
    const users = await User.find({ _id: req.user_id});
    res.status(200).json({users: users, token: token});
    
}

const update = async (req, res) => {
    console.log("Updating by holly")
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


const ProfileController = {
    getUser: getUser,
    update: update
}

module.exports = ProfileController;