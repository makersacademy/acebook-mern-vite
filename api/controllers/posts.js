const Post = require("../models/post");
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  const posts = await Post.find()
    .populate({
      path: 'comments',
      populate: { path: 'user' }
    })
    .populate('postedBy');
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
	console.log(postID)

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

const postComment = async (req, res) => {
	const commentText = req.body.commentText
	const userId = req.body.userId
	const postId  = req.params.postId

	try {
	const post = await Post.findOneAndUpdate(
		{_id: postId},
		{ $push: { comments: {
			message: commentText,
			user: userId
		}}},
		{new: true}
	)
	console.log(commentText)
	res.status(200).json({message: 'post comment successful'});

	} catch(error) {
		res.status(500).json({message: error.message})
	}

}

const PostsController = {
	getAllPosts: getAllPosts,
	createPost: createPost,
	likePost: likePost,
	postComment: postComment
};

module.exports = PostsController;
