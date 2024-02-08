// frontend/src/components/Post/Post.jsx

import React, { useEffect, useState } from "react";
import "../../pages/Feed/FeedPage.css";
import { likePost } from "../../services/posts";
import { getAllLikesByPostId } from "../../services/posts";
import CreateNewComment from "../Comment/CreateNewComment";
import CommentsList from "../Comment/CommentsList";
import { useNavigate } from "react-router-dom";

const Post = ({ post, token }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [toggleCommentForm, setToggleCommentForm] = useState(false);
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate(`/profile/${post.user_id}`);
  };

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likesData = await getAllLikesByPostId(post._id, token);

        setIsLiked(likesData.userLiked);
        setNumberOfLikes(likesData.numberOfLikes);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
  
    if (token && post._id) {
      fetchLikes();
    }
  }, [post._id, token, numberOfLikes, isLiked]);
  

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

  // Function to handle opening of the comment form
  const handleCommentClick = async () => {
    setToggleCommentForm(!toggleCommentForm);
  };

  // console.log(post.comments)
  return (
    <div className="post" id={post._id}>
      <div className="post-header">
        <a onClick={navigateToProfile} className="author-container">
          <img src={post.profile_pic} alt={`Author's avatar`} />
          <p>{post.full_name}</p>
        </a>
      </div>
      <div className="post-content">
        <article>{post.message}</article>
        {post.image != "" ? ( <img src={post.image} className="post-image"/>): null} 
        {/* <div>user_id: {post.user_id}</div> */}
      </div>
      <div className="post-actions">
      <div className="like-btn" onClick={handleLikeClick}>
        <i className={isLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>
        <span>Likes: {numberOfLikes}</span>
      </div>
        <div className="comment-btn">
          <button onClick={handleCommentClick} >Comments</button>
        </div>
      </div>
      <div className="feed" role="feed">
        {toggleCommentForm ? 
        <div>
          <CommentsList postId={post._id}/>
          {/* <CreateNewComment post_id={post._id} />  */}
        </div> 
        : <></>}
      </div>
    </div>
  );
};

export default Post;