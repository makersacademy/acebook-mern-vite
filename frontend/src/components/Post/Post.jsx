import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { likePost, unlikePost } from "../../services/posts";
import './Post.css'; // Ensure you have styles for the post
import Comment from "../Comment/Comment";
import { createComment, getPostComments } from "../../services/commentsServices";

const Post = ({ post, updatePost }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [userName, setUserName] = useState('');
  const [profilePicture, setProfilePicture] = useState(''); // State for profile picture
  const [comments, setComments] = useState([]);
  const [commentMessage, setCommentMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (post.likedBy && token) {
      const userId = JSON.parse(atob(token.split('.')[1])).user_id;
      setHasLiked(post.likedBy.includes(userId));
    }

    if (post.user_id) {
      setUserName(`${post.user_id.firstName} ${post.user_id.lastName}`);
      const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
      const defaultProfilePicture = `${backendUrl}/uploads/default-profile.png`;
      setProfilePicture(post.user_id.profilePicture ? `${backendUrl}${post.user_id.profilePicture}` : defaultProfilePicture); // Use environment variable for backend URL
    }
  }, [post.likedBy, post.user_id]);

  const handleLikeToggle = async () => {
    const token = localStorage.getItem('token');
    try {
      let updatedPost;
      if (hasLiked) {
        updatedPost = await unlikePost(token, post._id);
      } else {
        updatedPost = await likePost(token, post._id);
      }
      setHasLiked(!hasLiked);
      updatePost(updatedPost);
    } catch (error) {
      console.error(`Error ${hasLiked ? 'unliking' : 'liking'} post: `, error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getPostComments(token, post._id)
        .then((data) => {
          setComments(data.comments);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [post._id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    
    const newComment = {
      commentMessage: commentMessage,
      createdAt: new Date(), 
      postId: post._id,
      userId: user_id
    };

    const commentCreated = await createComment(token, newComment);

    setComments((currComments) => [commentCreated, ...currComments]);
    setCommentMessage(''); // Clear the input field after submission
  };

  return (
    <>
      <div className="post">
        <div className="user-info">
          <img
            src={profilePicture}
            alt="Profile"
            className="profile-picture"
            onError={(e) => { e.target.onerror = null; e.target.src=`${import.meta.env.VITE_BACKEND_URL}/uploads/default-profile-photo.jpg`; }}
          />
          <p><strong>{userName}</strong></p>
        </div>
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
      <form onSubmit={handleCommentSubmit}>
        <label>Comment:</label>
        <input
          type="text"
          onChange={(e) => setCommentMessage(e.target.value)}
          value={commentMessage}
          required
        />    
        <button type="submit">Comment</button>
      </form>

      <div>
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </>
  );
};

export default Post;
