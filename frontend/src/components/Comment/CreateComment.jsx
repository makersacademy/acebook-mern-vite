import React, { useState } from "react";
import { createNewComment } from "../../services/comments";

const CreateComment = ({ postId }) => {
  const [newComment, setNewComment] = useState("");

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const commentData = {
      postId: postId,
      comment_text: newComment,
    };

    createNewComment(token, commentData)
      .then(() => {
        console.log("Comment created successfully");
        setNewComment("");
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={newComment}
        onChange={handleChange}
        placeholder="Type your comment here"
      />

      <button onClick={handleSubmit}>Create Comment</button>
    </div>
  );
};

export default CreateComment;
