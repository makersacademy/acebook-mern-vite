import Comment from "../Comment/Comment"
import { useState } from "react";



const Post = (props) => {
  const [comments, setComments] = useState([]);
  const [commentMessage, setCommentMessage] = useState('');
  
  //SHOW COMMENTS USING THE COMMENT COMPONENT, AND RENDER TO THE POST, THEN CLEAR THE FORM
  // READY FOR A NEW COMMENT.
  
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      _id: Date.now().toString(), // Generate a temporary ID for the new comment
      message: commentMessage,
    };
    setComments([...comments, newComment]);
    setCommentMessage(''); // Clear the input field after submission
  };

  return (
    <>
      <article key={props.post._id}>{props.post.message}</article>;
      <form onSubmit={handleCommentSubmit}>
        <label>Comment:</label>
        <input
          type="text"
          value={commentMessage}
          onChange={(e) => setCommentMessage(e.target.value)}
          required
        />    
        <button type="submit">Comment</button>
      </form>

      <div>
        {comments.map((comment) => (
          <div key={comment._id}>
          <Comment comment={comment} />
          </div>
        ))};
      </div>
  </>
)
};


export default Post;
