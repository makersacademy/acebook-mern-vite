// const Post = (props) => {
//   return <article key={props.post._id}>{props.post.message}</article>;
// };

// export default Post;

// Post.jsx

import React from "react";
import "../../pages/Feed/FeedPage.css";
// frontend/src/pages/Feed/FeedPage.css
// frontend/src/components/Post/Post.jsx

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="post-header">
        {/* <img src={post.author.avatar} alt={`${post.author.name}'s avatar`} /> */}
        <img src='#' alt={`Author's avatar`} />
        {/* <h4>{post.author.name}</h4> */}
        <h4>Author's name</h4>
      </div>
      <div className="post-content">
        <p>{post.message}</p>
      </div>
      <div className="post-actions">
        <div className="like-btn">
          <span>Like</span>
        </div>
        <div className="comment-btn">
          <span>Comment</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
