import "../../../css/post.css"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { likePost } from '../../services/posts';
import { unlikePost } from '../../services/posts';

const Post = (props) => {
  // console.log("this is the props:", props)
  const navigate = useNavigate();
  const token = props.token
  const postId = props.post._id
  const userId = localStorage.getItem("userId");
  const initialLikeCount = props.post.likes.length;
  const initialLikeStatus = props.post.likes.includes(userId)


  const [likeStatus, setLikeStatus] = useState(initialLikeStatus)
  const [likeCount, setLikeCount] = useState(initialLikeCount)

  const handleLike = async () => {

    if (likeStatus == false) {
    setLikeCount(likeCount + 1);

    try {
      await likePost(token, postId);
      navigate("/posts");
  } catch (err) {
      console.error(err);
      navigate("/posts");
  }
  } else if (likeStatus == true) {
    setLikeCount(likeCount - 1);
    try {
      await unlikePost(token, postId);
      navigate("/posts");
  } catch (err) {
      console.error(err);
      navigate("/posts");

  }}
  setLikeStatus(!likeStatus)}

  return <div key={props.post._id} className="post">
    <h2>{props.post.username} - {props.post.createdAt}</h2>
    <article>{props.post.message}</article>
    <button onClick={ handleLike }>{likeStatus ? 'Unlike' : 'Like'}</button>
    <p>{likeCount} likes</p>
    </div>
};

export default Post;
