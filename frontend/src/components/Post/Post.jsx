import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getComment } from "../../services/comment";
import CommentForm from "./CommentForm";
import Comment from "./Comment";


export const Post = (props) => {
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [viewComment, setCommentSection] = useState(false);
  const navigate = useNavigate();
  
  const getPostById = (data, post_id) => {
    const comments = data.comments.filter((comment) => comment.post_id == post_id)
    setComments(comments)
  }

  const handleClick = (event) => {
    event.preventDefault();
    setCommentSection(!viewComment)
  }

  useEffect(() => {
    if (token) {
      getComment(token)
        .then((data) => {
          getPostById(data, props.post._id)
          setToken(data.token);
          window.localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.err(err);
        });
    } else {
      navigate("/posts");
    }
  }, []);

  if (!token) {
    return;
  }

  return (
  <>
  <br/>
  <h4>POSTS</h4>
  <article key={props.post._id}>{props.post.message}</article>
  <div><h6>{props.date}</h6></div>
  <div>
    <button type="button" onClick={handleClick}>View comments</button>
  </div>
  {viewComment && <div className="comment_section" role="comment_section">
    <CommentForm role="new-comment" post_id={props.post._id}/>
    <div className="comment" role="comment">
        {comments.toReversed().map((comment) => (
        <Comment comment={comment} key={comment._id} date={comment.time_of_comment} />
        ))}
    </div>
  </div>}
      


  </>
  
  )

};

export default Post;
