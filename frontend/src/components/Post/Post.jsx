import "../../../css/post.css"
import { useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import { likePost } from '../../services/posts';
import { unlikePost } from '../../services/posts';



const Post = (props) => {

  const token = props.token
  const postId = props.post._id
  const postTimestamp = props.post.createdAt
  const userId = localStorage.getItem("userId");
  const initialLikeCount = props.post.likes.length;
  const initialLikeStatus = props.post.likes.includes(userId)

  const [likeStatus, setLikeStatus] = useState(initialLikeStatus)
  const [likeCount, setLikeCount] = useState(initialLikeCount)

  function formatTimestamp(timestamp) {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  }
  
  const formattedTimestamp = formatTimestamp(postTimestamp);

  const handleLike = async () => {

    if (likeStatus == false) {
    setLikeCount(likeCount + 1);

    try {
      await likePost(token, postId);


  } catch (err) {
      console.error(err);
      setLikeCount(likeCount); // Revert state change on error

  }
  } else if (likeStatus == true) {
    setLikeCount(likeCount - 1);
    try {
      await unlikePost(token, postId);
      // navigate("/posts");
  } catch (err) {
      console.error(err);
      // navigate("/posts");
      setLikeCount(likeCount); // Revert state change on error

  }}
  setLikeStatus(!likeStatus)}

  return <div key={props.post._id} className="post">
    <h2>{props.post.username} - {formattedTimestamp}</h2>
    <article>{props.post.message}</article>
    <button onClick={ handleLike }>{likeStatus ? 'Unlike' : 'Like'}</button>
    <p>{likeCount} likes</p>
    </div>
};

export default Post;
