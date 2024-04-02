import React, { useState, useEffect } from "react";
import { getComments } from "../../services/comments";

const Comment = ({ postId }) => {
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getComments(postId, token)
        .then((data) => {
          console.log("Received comment data:", data);
          setCommentData(data.comments);
        })
        .catch((error) => console.error("Error fetching comments:", error));
    }
  }, [postId]);

  return (
    <div>
      <h1>Comments</h1>
      {commentData.map((comment) => (
        <div className="comment" key={comment._id}>
          <p className="comment-fullName">{comment.user.fullName}</p>
          <p className="comment-text">{comment.comment_text}</p>
          <p className="like-count">{comment.likeCounter}</p>
        </div>
      ))}
    </div>
  );
};

export default Comment;
