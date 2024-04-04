import React, { useState } from "react";
import { likePost } from "../../services/like";
// import Like from "./Like";
import CreateComment from "../Comment/CreateComment";
import Comment from "../Comment/Comments";
import "./Post.css";

const LikeButton = ({ postId, userId, isLiked, updatePost }) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async () => {
    try {
      await likePost(postId, userId);
      setLiked(!liked);
      updatePost(postId, !liked); // Update the post after like/unlike
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <button className="like-post" onClick={handleLike}>
      {liked ? "Unlike" : "Like"}
    </button>
  );
};

const Post = ({ post, userId }) => {
  const [liked, setLiked] = useState(post.liked);

  const updatePost = (postId, liked) => {
    // Update the state of the post
    setLiked(liked);
  };

  const token = localStorage.getItem("token");
  const addOrdinalSuffix = (day) => {
    if (day === 1 || day === 21 || day === 31) return day + "st";
    if (day === 2 || day === 22) return day + "nd";
    if (day === 3 || day === 23) return day + "rd";
    return day + "th";
  };
  
  const date = new Date(post.createdAt);
  const day = addOrdinalSuffix(date.getDate());
  const month = date.toLocaleString("en-GB", { month: "short" });
  const time = date.toLocaleString("en-GB", { hour: "numeric", minute: "numeric" });
  
  const formattedDate = `${day} ${month} ${date.getFullYear()} at ${time}`;
  
  return (
    
      <article className="post" key={post._id}>
        <div className="post-header-container">
          <img
            className="post-profile_picture"
            src={post.user ? post.user.profilePicture : ""}
            alt="Profile"
          />
          <p className="post-user-fullName">{post.user ? post.user.fullName : ""}</p>
          <p className="post-date">{formattedDate}</p>
        </div>
        <div className="post-message">
          <p>{post.message}</p>
          {post.image && <img className="postgit_image" src={post.image} alt="Post" />}
        </div>
        <p className="like-counter">{post.likedBy.length}</p>
        {/* Rest of your component */}
      
    
      <LikeButton
        postId={post._id}
        userId={userId}
        isLiked={liked}
        updatePost={updatePost}
      />
      <div className="comments">
        <Comment postId={post._id} token={token} />
      </div>
      <div className="create-comment">
        <CreateComment postId={post._id} />
      </div>
    </article>
  );
};

export default Post;
