const User = require("../models/user");
const { generateToken } = require("../lib/token");

const getUser = async (req, res) => {
    const token = generateToken(req.user_id);
    const users = await User.find({ _id: req.user_id});
    res.status(200).json({users: users, token: token});
    
}

const ProfileController = {
    getUser: getUser,
}

module.exports = ProfileController;