import React from "react";
// import Like from "./Like";
import CreateComment from "../Comment/CreateComment";
import Comment from "../Comment/Comments";

const Post = (props) => {
  const token = localStorage.getItem("token");
  return (
    <article className="post" key={props.post._id}>
      <p className="post-message">{props.post.message}</p>
      <img className="post-image" src={props.post.image} />
      <p className="post-date">{props.post.createdAt}</p>
      <p className="post-user-fullName">{props.post.user.fullName}</p>
      <img
        className="post-user-profile-picture"
        src={props.post.user.profilePicture}
      />
      <div className="comments">
        <Comment postId={props.post._id} token={token} />
      </div>
      <div className="create-comment">
        <CreateComment postId={props.post._id} />
      </div>
      {/* <p>
        <Like />
      </p> */}
    </article>
  );
};

export default Post;
