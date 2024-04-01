import React from "react";
//import Like from "./Like";
//import Comment from "./comment";

const Post = (props) => {
  return (
    <article className="post" key={props.post._id} data-testid="post-article">
      <p className="post-message" data-testid="post-message">{props.post.message}</p>
      <p className="post-date" data-testid="post-date">{props.post.date}</p>
      <img className="post-image" src={props.post.image} alt={props.post._id} data-testid="post-image" />
    </article>
  );
};

export default Post;
