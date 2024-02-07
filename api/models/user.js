const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const hashCost = 12;

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String, required: false },
});

UserSchema.pre("save", function (next) {
    const user = this;

    // Only hash the password if it has been created or modified
    if (!user.isModified("password")) return next();

    // Generate a salt
    bcrypt.genSalt(hashCost, function (err, salt) {
        if (err) return next(err);

        // Hash the password using the generated salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // Override the plaintext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
