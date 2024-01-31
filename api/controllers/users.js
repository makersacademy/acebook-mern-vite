const User = require("../models/user");
const crypto = require("crypto");
const { generateToken } = require("../lib/token");

const create = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Hash the password
    const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    const user = new User({ email, password: hashedPassword });
    user.save()
        .then((user) => {
            console.log("User created, id:", user._id.toString());
            res.status(201).json({ message: "OK" });
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json({ message: "Something went wrong" });
        });
};

const getUser = async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({
        username: username
    }).populate('friends').populate('posts');
    if(!user) {
        return res.status(400).json({ message: "User not found" });
    }  
    const token = generateToken(req.user_id);
    res.status(200).json({ user: user, token: token });
    
}

const UsersController = {
    create: create,
    getUser: getUser
};

module.exports = UsersController;
