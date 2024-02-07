const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../lib/token");

const createToken = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({
            email: { $regex: new RegExp(email, "i") },
        });
        if (!user) {
            console.log("Auth Error: User not found");
            return res.status(401).json({ message: "User not found" });
        }

        // Uses bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Auth Error: Passwords do not match");
            return res.status(401).json({ message: "Password incorrect" });
        }

        const token = generateToken(user.id);
        res.status(201).json({ token: token, message: "OK" });
    } catch (error) {
        console.error("Auth Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
  //Left the below in incase there are any errors with the change
    // const user = await User.findOne({ email: email });
    // if (!user) {
    //     console.log("Auth Error: User not found");
    //     res.status(401).json({ message: "User not found" });
    // } else if (user.password !== password) {
    //     console.log("Auth Error: Passwords do not match");
    //     res.status(401).json({ message: "Password incorrect" });
    // } else {
    //     const token = generateToken(user.id);
    //     res.status(201).json({ token: token, message: "OK" });
    // }

};

const AuthenticationController = {
    createToken: createToken,
};

module.exports = AuthenticationController;
