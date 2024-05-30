import "../../../css/post.css"
import { useState } from "react";

const Post = (props) => {

  const [likeStatus, setLikeStatus] = useState(false)
  // cont [likeCount, setLikeCount] = useState(0)
  const handleLike = () => {
    setLikeStatus(!likeStatus)
  }

  return <div key={props.post._id} className="post">
    <h2>{props.post.username} - {props.post.createdAt}</h2>
    <article>{props.post.message}</article>
    <button onClick={ handleLike }>{likeStatus ? 'Unlike' : 'Like'}</button>
    <p>_likes</p>
    </div>
};

export default Post;
