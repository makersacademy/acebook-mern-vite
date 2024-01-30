const User = require("../models/user");
const crypto = require("crypto");

function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}

const create = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!password) {
        return res
            .status(400)
            .json({ message: "You haven't entered a password" });
    }

    if (checkPassword(password)) {
        return res.status(400).json({
            message:
                "You haven't entered a valid password. Password must contain at least 8 characters, an uppercase letter, a lowercase letter, a number and a special character.",
        });
    }

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
// 		.catch((err) => {
//             console.error(err);
//             res.status(500).json({ message: "Something went wrong" });
// });

const UsersController = {
    create: create,
};

module.exports = UsersController;

// Hash the password
//     const hashedPassword = crypto
//         .createHash("sha256")
//         .update(password)
//         .digest("hex");

//     const user = new User({ email, password: hashedPassword });
//     user.save()
//         .then((user) => {
//             console.log("User created, id:", user._id.toString());
//             res.status(201).json({ message: "OK" });
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(400).json({ message: "Something went wrong" });
//         });
// };

// const UsersController = {
//     create: create,
// };

// module.exports = UsersController;
