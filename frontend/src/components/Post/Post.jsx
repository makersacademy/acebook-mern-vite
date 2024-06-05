import Comment from "../Comment/Comment"
import { useState, useEffect } from "react";
import {createComment, getPostComments} from "../../services/commentsServices"



const Post = (props) => {
  const [comments, setComments] = useState([]);
  const [commentMessage, setCommentMessage] = useState('');
  
  //SHOW COMMENTS USING THE COMMENT COMPONENT, AND RENDER TO THE POST, THEN CLEAR THE FORM
  // READY FOR A NEW COMMENT.
  
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
  console.log("line 34", comments)

  return (
    <>
      <article key={props.post._id}>{props.post.message}</article>;
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
)
};


export default Post;
