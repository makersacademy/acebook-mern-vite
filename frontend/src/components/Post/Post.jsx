import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { likePost, unlikePost } from "../../services/posts";

const Post = ({ post, updatePost }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if the current user has liked the post
    const token = localStorage.getItem('token');
    if (post.likedBy && token) {
      const userId = JSON.parse(atob(token.split('.')[1])).user_id;
      setHasLiked(post.likedBy.includes(userId));
    }

    // Set the user name only once
    if (post.user_id && post.user_id.firstName && post.user_id.lastName) {
      setUserName(`${post.user_id.firstName} ${post.user_id.lastName}`);
    } else {
      setUserName('Unknown User');
    }
  }, [post.likedBy, post.user_id]);

  const handleLikeToggle = async () => {
    const token = localStorage.getItem('token');
    try {
      let updatedPost;
      if (hasLiked) {
        console.log(`Unliking post with ID: ${post._id}`);
        updatedPost = await unlikePost(token, post._id);
      } else {
        console.log(`Liking post line 36 with ID: ${post._id}`);
        updatedPost = await likePost(token, post._id);
      }
      console.log('Updated post:', updatedPost);
      setHasLiked(!hasLiked);
      updatePost(updatedPost);
    } catch (error) {
      console.error(`Error ${hasLiked ? 'unliking' : 'liking'} post: `, error);
    }
  };

  return (
    <div className="post">
      <p><strong>{userName}</strong></p>
      <h3>{post.message}</h3>
      <div className="post-info">
        <span>{new Date(post.date).toLocaleString()}</span>
        <div className="likes">
          <FontAwesomeIcon 
            icon={faHeart} 
            className={`heart ${hasLiked ? 'liked' : ''}`} 
            onClick={handleLikeToggle} 
          />
          <span>{post.numOfLikes}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
