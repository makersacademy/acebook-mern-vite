import React from "react";
// import Like from "./Like";
import CreateComment from "../Comment/CreateComment";
import Comment from "../Comment/Comments";
import "./Post.css"

const Post = (props) => {
  const token = localStorage.getItem("token");
  return (
    <article className="post" key={props.post._id}>
      <div className="post-header-container">
        <img className="post-image" src={props.post.user.profilePicture} alt="Profile" />
        <p className="post-user-fullName">{props.post.user?.fullName}</p>
        <p className="post-date">{props.post.createdAt}</p>
      </div>
      <div className="post-message">
        <p>{props.post.message}</p>
      </div>
      <div className="comments">
        <Comment postId={props.post._id} token={token} />
      </div>
      <div className="create-comment">
        <CreateComment postId={props.post._id} />
      </div>
    </article>
  );
};

export default Post;
