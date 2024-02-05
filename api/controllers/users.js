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

const create = async (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	if (!password || !username || !email) {
		return res.status(400).json({ message: "Dang! One of the boxes is empty" });
	}

	if (!checkPassword(password)) {
		return res.status(400).json({
			message:
				"Ya haven't chucked in a proper password, mate. Gotta be at least 8 characters long, with an uppercase letter, a lowercase letter, a number, and a ripper special character.",
		});
	}
	if (!checkEmail(email)) {
		return res.status(400).json({
			message: "You haven't entered a valid email.",
		});
	}

	try {
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(409).json({ message: "Sorry cobber, but someone's already bagged that username." });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });	}
	
	try {
		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(409).json({ message: "Looks like someone's already snatched up that email address, mate." });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });	}

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
			model: 'Comment',
		}})
		.populate({
			path: "posts",
			model: "Post",
			populate: {
				path: "postedBy",
				model: 'User'
			}
		})
    if(!user) {
        return res.status(400).json({ message: "User not found" });
    }  
    const token = generateToken(req.user_id);
    res.status(200).json({ user: user, token: token });
    
}

const searchUsers = async (req, res) => {
	const searchQuery = req.query.search;
	const results = await User.find({username: searchQuery})

	if(!results) {
        return res.status(400).json({ message: "No search results" });
    }  
    return res.status(200).json({ result: results} );
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
		res.status(500).json({ message: 'Dang! An error occurred while uploading the picture.' });
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
		res.status(500).json({ message: 'Dang! An error occurred while updating the bio.' });
	}
}


const addFriend = async(req, res) => {
	const username = req.params.username
	const requestingUserId = req.body.requestingUserId

	const requestingUser = await User.findById(requestingUserId);
	if (!requestingUser) {
	return res.status(400).json({ message: "Requesting user not found" });
	}

	try {
		const updatedUser = await User.findOneAndUpdate(
			{username:username},
			{$addToSet: {friends: requestingUserId}},
			{new: true}
		);
		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({message: 'Friend added to array'});
	} catch (error) {
		res.status(500).json({message: "error adding friend"})
	}

}

const removeFriend = async(req, res) => {

	const username = req.params.username
	const requestingUserId = req.body.requestingUserId

	try {
		const updatedUser = await User.AndUpdate(
			{username:username},
			{$pull: {friends: requestingUserId}},
			{new:true}
		);
		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({message: 'Friend removed from array'});	
	} catch (error) {
		res.status(500).json({message: "error removing friend"})
	}
}



const UsersController = {
    create: create,
    getUser: getUser,
	uploadImage: uploadImage,
	editBio: editBio,
	searchUsers: searchUsers,
	addFriend: addFriend,
	removeFriend: removeFriend
};

module.exports = UsersController;
