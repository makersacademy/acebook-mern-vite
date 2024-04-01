import React from "react";
// import Like from "./Like";
// import Comment from "./comment";

const Post = (props) => {
  return (
    <article className="post" key={props.post._id}>
      <p className="post-message">{props.post.message}</p>
      <p className="post-date">{props.post.date}</p>
      <p className="post-user">{props.post.user}</p> 
      <p className="post-user-fullName">{props.post.user.fullName}</p>
      <img className="post-image" src={props.post.image} alt={props.post._id} />
    </article>
  );
  };

export default Post;
