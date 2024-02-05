const User = require("../models/user");
const { generateToken } = require("../lib/token");

const getUser = async (req, res) => {
    console.log("Get user by holly")
    const token = generateToken(req.user_id);
    const users = await User.find({ _id: req.user_id});
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



const ProfileController = {
    getUser: getUser,
    update: update
}

module.exports = ProfileController;