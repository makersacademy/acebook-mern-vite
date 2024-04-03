import React, { useState } from "react";
import { likePost } from "../../services/like";

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

  return (
    <article className="post" key={post._id}>
      <p className="post-message">{post.message}</p>
      <p className="post-date">{post.date}</p>
      <p className="post-user-fullName">{post.user?.fullName}</p>
      <p className="like-counter">{(post.likedBy).length}</p>
      <img className="post-image" src={post.image} alt={post._id} />

      <LikeButton
        postId={post._id}
        userId={userId}
        isLiked={liked}
        updatePost={updatePost}
      />
    </article>
  );
};

export default Post;