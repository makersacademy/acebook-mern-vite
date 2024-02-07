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

    try {
        const {email, profilePic } = req.body;

        if (!email || !profilePic) {
            console.log("Either no email or no profile pic")
            return res.status(400).json({ message: "No fields to update" });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            console.log("No user found for email address " + email);
            return res.status(400).json({ message: "User does not exist" });
        }

    //console.log("Updating by holly")
    //const username = req.body.username;
    //const email = req.body.email;
    //const password = req.body.password;
    //const profilePic = req.body.profilePic;
    


        if (email) {
            user.email = email;
        }

        if (profilePic) {
            user.profilePic = profilePic;
        }

        await user.save();

        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getUsers = async (req, res) => {
    const users = await User.find().sort({username: 1});
    const token = generateToken(req.user_id);
    res.status(200).json({users: users, token: token});
  }

const addFriend = async (req, res) => {
    if (req.user_id != req.params.id) {
        await User.findOneAndUpdate({_id: req.user_id},{$addToSet: {friends: req.params.id}})
    
    //            {if: { 
    //                $ne: [req.params.id, req.user_idfriends]},
    //            then: {$addToSet: {friends: req.params.id}},
    //            else: "$$REMOVE"}
//);


    const newToken = generateToken(req.user_id);
    res.status(200).json({message: "Friend added", token: newToken})
}};


const ProfileController = {
    getUser: getUser,
    update: update,
    getUsers: getUsers,
    addFriend: addFriend
}

module.exports = ProfileController;