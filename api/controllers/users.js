const User = require("../models/user");
const crypto = require("crypto");
const { generateToken } = require("../lib/token");

function checkPassword(str) {
	var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
	return re.test(str);
}

function checkEmail(str) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(str);
}

const create = (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	if (!password) {
		return res.status(400).json({ message: "You haven't entered a password" });
	}

	if (!checkPassword(password)) {
		return res.status(400).json({
			message:
				"You haven't entered a valid password. Password must contain at least 8 characters, an uppercase letter, a lowercase letter, a number and a special character.",
		});
	}
	if (!checkEmail(email)) {
		return res.status(400).json({
			message: "You haven't entered a valid email.",
		});
	}
	// Hash the password
	const hashedPassword = crypto
		.createHash("sha256")
		.update(password)
		.digest("hex");

	const user = new User({ username, email, password: hashedPassword });
	user
		.save()
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
    }).populate({
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
    if(!user) {
        return res.status(400).json({ message: "User not found" });
    }  
    const token = generateToken(req.user_id);
    res.status(200).json({ user: user, token: token });
    
}


const uploadImage = async (req, res) => {
	const username = req.params.username;
	console.log(req.file);
	const fileName = req.file.filename

	try {
		const updatedUser = await User.findOneAndUpdate(
			{username: username},
			{$set: {image: fileName} },
			{ new: true }
		)
		
		return res.status(200).json({message: 'picture uploaded', user:updatedUser, image:updatedUser.image, testMessage:"hello"});
	} catch (error) {
		res.status(500).json({ message: 'An error occurred while uploading the picture.' });
	}
}


const editBio = async (req, res) => {
	const username = req.params.username;
	const newBio = req.body.bio
	console.log("this is the bio", newBio);
	try {
		const updatedUser = await User.findOneAndUpdate(
			{username: username},
			{$set: {bio: newBio} },
			{ new: true }
		)
		res.status(200).json({message: 'Bio updated'});
	} catch (error) {
		res.status(500).json({ message: 'An error occurred while updating the bio.' });
	}
}

const UsersController = {
    create: create,
    getUser: getUser,
	uploadImage: uploadImage,
	editBio: editBio
};

module.exports = UsersController;

