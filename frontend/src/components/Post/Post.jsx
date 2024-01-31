// frontend/src/components/Post/Post.jsx

import React, { useState } from "react";
import "../../pages/Feed/FeedPage.css";
import { likePost } from "../../services/posts"; // Import the likePost function

const Post = ({ post, token }) => {
  const [isLiked, setIsLiked] = useState(false);

  // Function to handle liking/unliking a post
  const handleLikeClick = async () => {
    try {
      // Call the likePost function to send the like request to the backend
      await likePost(post._id, token);

      // Toggle the like status in the UI
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error liking the post:", error.message);
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        {/* <img src={post.author.avatar} alt={`${post.author.name}'s avatar`} /> */}
        <img src="#" alt={`Author's avatar`} />
        {/* <h4>{post.author.name}</h4> */}
        <h4>Author's name</h4>
      </div>
      <div className="post-content">
        <article>{post.message}</article>
      </div>
      <div className="post-actions">
        <div className="like-btn" onClick={handleLikeClick}>
          {/* Display "Like" or "Unlike" based on the isLiked state */}
          <button>{isLiked ? "Unlike" : "Like"}</button>
        </div>
        <div className="comment-btn">
          <span>Comment</span>
        </div>
      </div>
    </div>
  );
};

export default Post;

