const Post = require("../models/post");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
	const posts = await Post.find();
	const token = generateToken(req.user_id);
	res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
	const post = new Post(req.body);
	post.save();

	const newToken = generateToken(req.user_id);
	res.status(201).json({ message: "OK", token: newToken });
};

const likePost = async (req, res) => {
	const postID = req.body.postID;
	const userID = req.user_id;

	try {
		const updatedpost = await Post.findOneAndUpdate(
			{ _id: postID },
			{ $push: { likes: userID } },
			{ new: true }
		);
		res.status(200).json({ message: "Post liked" });
	} catch (error) {
		console.error("Error updating post:", error);
		res.status(500).json({
			message: "An error occurred while updating the likes.",
		});
	}
};

const PostsController = {
	getAllPosts: getAllPosts,
	createPost: createPost,
	likePost: likePost,
};

module.exports = PostsController;
