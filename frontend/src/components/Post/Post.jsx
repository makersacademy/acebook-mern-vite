import LikeButton from "../LikeButton";
import { useState } from "react";


const Post = (props) => {
  const [likes, setLikes] = useState(props.post.likes);


  return (<><br/><br/><article key={props.post._id}>{props.post.message}</article>
  <div>{props.date}</div>
  <LikeButton likes={likes} post={props.post} user_id={props.user_id}/></>)
};

export default Post;
