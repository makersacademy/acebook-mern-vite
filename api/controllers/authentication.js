const User = require("../models/user");
const crypto = require("crypto");
const { generateToken } = require("../lib/token");

const createToken = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Hash the password
    const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    console.log("Hashed password:", hashedPassword);

    const user = await User.findOne({ email: email })
        .populate({
            path:'friends',
            model: 'User'
        }).populate({
            path: "posts",
            model: "Post",
            populate: {
                path:'comments',
                model: 'Comment'
            }
        })
    console.log("User found:", user); // Log the user found
    if (!user) {
        console.log("Auth Error: User not found");
        res.status(401).json({ message: "User not found" });
    } else if (user.password !== hashedPassword) {
        console.log("User password:", user.password); // Log the user's stored password
        console.log("Hashed password for comparison:", hashedPassword);
        console.log("Auth Error: Passwords do not match");
        res.status(401).json({ message: "Password incorrect" });
    } else {
        const token = generateToken(user.id);
        console.log("Generated token:", token);
        return res.status(201).json({ user: user, token: token, message: "OK" });
    }
};

const AuthenticationController = {
    createToken: createToken,
};

module.exports = AuthenticationController;
