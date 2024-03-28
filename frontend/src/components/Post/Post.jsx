import React from "react";
import Like from "./Like";
import Comment from "./comment";

const Post = (props) => {
  return (
    <article className="post" key={props.post._id}>
      <p className="post-message">{props.post.message}</p>
      <p className="post-date">{props.post.date}</p>
      <img className="post-image" src={props.post.image} alt={props.post._id} />
      <p>
        <Like />
      </p>
      <p>
        <Comment />
      </p>
    </article>
  );
};

export default Post;
