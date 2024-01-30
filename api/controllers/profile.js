const User = require("../models/user");
const { generateToken } = require("../lib/token");

const getAllUsers = async (req, res) => {
    const users = await User.find();
    const token = generateToken(req.user_id);
    res.status(200).json({users: users, token: token});
}

const ProfileController = {
    getAllUsers: getAllUsers,
}

module.exports = ProfileController;