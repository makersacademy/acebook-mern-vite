const Post = require("../models/post");
const { generateToken } = require("../lib/token");

async function getAllPosts(req, res) {
  const posts = await Post.find().populate('author', 'username');
  // console.log(`POSTS req.user_id ${req.user_id}`)
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
}

async function createPost(req, res) {
  const post = new Post({
    userPic: req.body.userPic,
    message: req.body.message,
    author: req.user_id, // including author from the request
  });
  post.save();
  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
}

async function updatePost(req, res) {
  const post = await Post.findById(req.params.post_id); //get post by id
  // console.log("User ID from token:", req.user_id)
  const user_id = req.user_id;
  const likedBy = await post.likes.liked_by.includes(user_id); //checkif user_id is in the post.likes.liked_by array 
  console.log(`likedBy =  ${likedBy}`);
  // const newMessage = `${req.message} (edited)`; // add '(edited)' to the end of the new message in req
  // post.message = newMessage; //update message to the new message
  // console.log(`Updating post: ${req.params.post_id} for user: ${req.user_id}`);
  let update; // declare an update variable without initialising it to a value
  if (likedBy) { 
    update = {
      $pull: {"likes.liked_by": user_id}, // remove the user_id from the array
      $inc: {"likes.count": -1}, //decrement the count by 1
    };
  } else {
    update = {
      $push: {"likes.liked_by": user_id}, // add the user_id to the array
      $inc: {"likes.count": 1} //increment the count by one
    };
  }
  // console.log(`update in controller= ${JSON.stringify(update)}`)
  const updatedPost = await Post.findByIdAndUpdate(req.params.post_id , update, { new: true }).populate('author', 'username'); //{ new: true } means updated post is returned 
  const token = generateToken(req.user_id);
  console.log("Post likes.liked_by:", post.likes.liked_by);
  res.status(200).json({ message: "Post updated", post: updatedPost, token: token }); //add updated post 
} 

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  updatePost: updatePost,
};

module.exports = PostsController;
