const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const User = require("../models/user");
const fs = require('fs');
const mongoose = require("mongoose");
const Photo = require("../models/photo");
const path = require('path');

async function getAllPosts(req, res) {
  const currentUser = await User.find({ _id: req.user_id })
  const followingList = currentUser[0].following
  console.log("FOLLOWING BEFORE", followingList)
  followingList.push(new mongoose.Types.ObjectId(req.user_id))
  console.log("FOLLOWING AFTER", followingList)

  const posts = await Post.find({ user_id: { $in: followingList } });
  // console.log("posts:", posts)


  const postsWithUserDetails = await Promise.all( 
    posts.map(async (post) => {
    // console.log(post.user_id)
    const user_id = post.user_id;
    // console.log('CURRENT, user id: '+req.user_id);
    const currentUserId = new mongoose.Types.ObjectId(req.user_id);


    const user_data = await User.find({ _id: user_id });

    const photo = await Photo.find({ user_id: user_id })
    let filePath
    if (photo.length === 0) {
      filePath = "uploads/default_photo.webp"
    } else {
      filePath = photo[0].photoFilePath
    }


    const enrichedPost = {
      ...post._doc,
      firstName: user_data[0].firstName,
      lastName: user_data[0].lastName,
      filePath: filePath,
      currentUserId: currentUserId,
      username: user_data[0].username
    };
    // console.log('enrichedPost:');
    // console.log(enrichedPost);
    return enrichedPost;
  })
);
  const filteredPosts = postsWithUserDetails.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp());
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: filteredPosts, token: token });
}






async function getPostsForUser(req, res) {
  const queryUser = await User.find({ username: req.params.username });
  const posts = await Post.find({user_id: queryUser[0]._id});

  const postsWithUserDetails = await Promise.all( 
    posts.map(async (post) => {
    const user_id = post.user_id;
    const currentUserId = new mongoose.Types.ObjectId(req.user_id);
    const user_data = await User.find({ _id: user_id });
    const photo = await Photo.find({ user_id: user_id })
    let filePath
    if (photo.length === 0) {
      filePath = "uploads/default_photo.webp"
    } else {
      filePath = photo[0].photoFilePath
    }
    const enrichedPost = {
      ...post._doc,
      firstName: user_data[0].firstName,
      lastName: user_data[0].lastName,
      filePath: filePath,
      currentUserId: currentUserId,
      username: user_data[0].username
    };
    return enrichedPost;
  })
);
  const filteredPosts = postsWithUserDetails.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp());
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: filteredPosts, token: token });
}

async function createPost(req, res) {

  const newPostData = {
    message: req.body.message,
    user_id: new mongoose.Types.ObjectId(req.user_id),
    likes: [],
    likeCount: 0,
    currentUserId: new mongoose.Types.ObjectId(),
    photoFilePath: null


  }
  const post = new Post(newPostData);
  console.log("NEW POST IS HERE LOOK AT ME", post._id.toString())
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken, message_id: post._id.toString() });
}

async function editPost(req, res) {
  try{
  postObjectId = new mongoose.Types.ObjectId(req.body.postId);
  const post = await Post.findById(postObjectId);
  console.log('1')
  if (!post) {
    return res.status(404).json({message: "Post not found"});
  }
  console.log('2')

  newMessage = req.body.message
  post.message = newMessage;
  await post.save();
  const newToken = generateToken(req.user_id);
  console.log('3')
  res.status(201).json({
    message: "Post edited successfully",
    token: newToken
  });
} catch (error) {
  res.status(500).json({ message: "Error updating post", error: error.message});
}
}

async function likePost(req, res) {
console.log("likePost has been called1!!!!!!!!")
  try {
    const postId = req.body.post_id;
    const user_id = new mongoose.Types.ObjectId(req.user_id);
    postObjectId = new mongoose.Types.ObjectId(postId)
    const post = await Post.findById(postObjectId);

    if (!post) {
      return res.status(404).json({message: "Post not found"});
    }

    const hasLiked = post.likes.includes(user_id);

    if (hasLiked) {
      post.likes = post.likes.filter(id => id.toString() !== req.user_id);
      post.likeCount -= 1;
    } else {
      post.likes.push(user_id);
      post.likeCount += 1;
    }
    
    await post.save();
    const newToken = generateToken(user_id);

    res.status(200).json({
      message: hasLiked ? "Post Unliked" : "Post Liked",
      likeCount: post.likeCount,
      token: newToken
    });
  } catch (error) {
    res.status(500).json({ message: "Error liking post", error: error.message});
  }
}

async function deletePost(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    photoUrl = post.photoFilePath
    console.log("PHOTO URL HERE:", photoUrl)
    const pathParts = __dirname.split(path.sep);
    const apiIndex = pathParts.indexOf('api');
    const apiPath = pathParts.slice(0, apiIndex + 1).join(path.sep);
    console.log("API PATH HERE:", apiPath)
    fs.unlink(`${apiPath}/${photoUrl}`, (err) => {
      console.log(err);
    })
    const deletePost = await Post.findByIdAndDelete(id);
    if (!deletePost) {
      return res.status(404).json({ err: "Post not found" });
    }
    res.status(200).json({ message: "Post was deleted successfully" });
  } catch (error) {
    res.status(500).json({ err: error.message});
  }
}

async function setPostPhoto(req, res) {

  try {
  const updatePhotoForPost = await Post.updateOne(
    { _id: req.params.post_id },
    { $set: { photoFilePath: req.file.path } } )
    console.log(updatePhotoForPost)
    res.status(201).json({ message: "Photo uploaded sucessfully" });
  } catch {
    console.log("No photo uploaded")
    res.status(500).json({ message: "Photo uploaded sfailed" });
  }
}


const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  likePost: likePost,
  getPostsForUser: getPostsForUser,
  deletePost: deletePost,
  editPost: editPost,
  setPostPhoto: setPostPhoto

};

module.exports = PostsController;




//CODE FOR GETTING OWN POST
// async function getAllPosts(req, res) {
//   const posts = await Post.find({ userId: req.user_id });
//   const token = generateToken(req.user_id);
//   // console.log(req.user_id)
//   res.status(200).json({ posts: posts, token: token });
// }
