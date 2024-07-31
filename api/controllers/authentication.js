const User = require("../models/user");
const { generateToken } = require("../lib/token");
const bcrypt = require("bcrypt");

const createToken = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });
    if (!user) {
        console.log("Auth Error: User not found");
        res.status(401).json({ message: "User not found" });
    }

    // bcrypt compare. user model does hashing so user is used instead of bcrypt - Abdallah
    user.compare(password, (err, isMatch) => {
        if (err) {
            console.error(err);
            res.status(400).json({
                message: "Unable to compare passwords",
            });
        } else if (!isMatch) {
            console.log("Auth Error: Passwords do not match");
            res.status(401).json({ message: "Password incorrect" });
        } else {
            const token = generateToken(user.id);
            res.status(201).json({ token: token, message: "OK" });
        }
    });
};

const AuthenticationController = {
    createToken: createToken,
};

module.exports = AuthenticationController;
