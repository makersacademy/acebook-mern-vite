import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { likePost, unlikePost } from "../../services/posts";
import Comment from "../Comment/Comment"
import {createComment, getPostComments} from "../../services/commentsServices"
  
const Post = ({ post, updatePost }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [userName, setUserName] = useState('');
  const [comments, setComments] = useState([]);
  const [commentMessage, setCommentMessage] = useState('');
  
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
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getPostComments(token, props.post._id)
        .then((data) => {
          setComments(data.comments);
          // localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); ////////////////////////
    const user_id = localStorage.getItem('user_id');
    
    const newComment = {
      commentMessage: commentMessage,
      createdAt : new Date(), 
      postId: props.post._id,
      userId: user_id
    }

    const commentCreated = await createComment(token, newComment)

    console.log(commentCreated._id);
    
    setComments((currComments)=>[commentCreated, ...currComments]);
    setCommentMessage(''); // Clear the input field after submission
  
  };
  return (
    <>
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

      <div key={Math.random().toString()}>
        {comments.map((comment) => (
          <Comment key={Math.random().toString()} comment={comment} />
        ))}
      </div>
      </>
  );

};


 

export default Post;
