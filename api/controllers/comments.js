// api/controllers/comments.js

const Comment = require("../models/comment");
const { generateToken } = require("../lib/token");
const mongoose = require("mongoose");
const Post = require("../models/post");
const BACKEND_URL = process.env.BACKEND_URL;

const getAllCommentsForAPost = async (req, res) => {
  try {
    var comments = await Post.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.postId), // Convert user_id to ObjectId if it's a string
        },
      },
      {
        $project: {
          comments: 1,
        },
      },
    ]);

    const token = generateToken(req.user_id);
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    comments = comments[0].comments; // We only want the comments from the comments section

    commentsWithUserDetails = await Promise.all(
      comments.map(async (data) => {
        //console.log("\nOriginal Data" + JSON.stringify(data));
        try {
          const userDetailsResponse = await fetch(
            `${BACKEND_URL}/users/${data.userId}`,
            requestOptions
          );
          if (!userDetailsResponse.ok) {
            throw new Error(
              `Failed to fetch user details for user ${data.userId}`
            );
          }
          let userDetails = await userDetailsResponse.json();
          const { full_name, profile_pic } = userDetails.user;
          return { ...data, full_name, profile_pic };
        } catch (error) {
          console.error(error);
        }
      })
    );
    //console.log("DATA: " + JSON.stringify(commentsWithUserDetails));
    res.status(200).json({ commentsWithUserDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const submitComment = async (req, res) => {
  try {
    const { userId, commentText } = req.body;

    const postId = req.body.postId; // Replace with your actual postId

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: { userId, text: commentText } } },
      { new: true } // This option returns the modified document instead of the original one
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// try {
//     // const { postId } = req.params;
//     const { userId, commentText } = req.body;

//     Post.update_one({"_id": new mongoose.Types.ObjectId("65bb8b55d2b033101978fc0e")}, {"$push": {"comments": {
//         userId: userId,
//         text: commentText,
//     }}})

//     // Find the post by postId
//     // const post = await Post.findById(new mongoose.Types.ObjectId("65bb8b55d2b033101978fc0e"));

//     // Check if the post exists
//     if (!post) {
//         return res.status(404).json({ message: 'Post not found' });
//         }

//         // Add the comment to the post
//         // post.comments.push({
//         // userId: userId,
//         // text: commentText,
//         // });

//         // // Save the post with the new comment
//         // await post.save();

//         res.status(201).json({ message: 'Comment added successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
//     };

const CommentsController = {
  getAllCommentsForAPost: getAllCommentsForAPost,
  submitComment: submitComment,
};

module.exports = CommentsController;
