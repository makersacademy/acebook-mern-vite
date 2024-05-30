import "../../../css/post.css"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { likePost } from '../../services/posts';

const Post = (props) => {
  const navigate = useNavigate();
  const token = props.token
  const postId = props.post._id

  const [likeStatus, setLikeStatus] = useState(false)
  // cont [likeCount, setLikeCount] = useState(0)

  const handleLike = async () => {
    setLikeStatus(!likeStatus)
    try {
      await likePost(token, postId);
      navigate("/posts");
  } catch (err) {
      console.error(err);
      navigate("/posts");
  }
  }

  return <div key={props.post._id} className="post">
    <h2>{props.post.username} - {props.post.createdAt}</h2>
    <article>{props.post.message}</article>
    <button onClick={ handleLike }>{likeStatus ? 'Unlike' : 'Like'}</button>
    <p>{props.post.likes}</p>
    </div>
};

export default Post;
