
import React, { useState } from "react";
import { likePost } from "../../services/like";
// import Like from "./Like";
import CreateComment from "../Comment/CreateComment";
import Comment from "../Comment/Comments";
import "./Post.css"

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
  return (
    <article className="post" key={post._id}>
      <div className="post-header-container">
        <img className="post-profile_picture" src={post.user.profilePicture} alt="Profile" />
        <p className="post-user-fullName">{post.user?.fullName}</p>
        <p className="post-date">{post.createdAt}</p>
      </div>
      <div className="post-message">
        <p>{post.message}</p>
        <img className="post_image" src={props.post.image}></img>
      </div>
        <p className="like-counter">{(post.likedBy).length}</p>
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