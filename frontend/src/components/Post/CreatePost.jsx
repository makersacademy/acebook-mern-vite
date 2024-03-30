import React, { useState } from "react";
import { createNewPost } from "../../services/posts";

const CreatePost = () => {
  const [newPost, setNewPost] = useState("");
  const [imagePath, setImagePath] = useState("");

  const handleChange = (event) => {
    setNewPost(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImagePath(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const postData = {
      message: newPost,
      image: imagePath,
    };

    createNewPost(token, postData)
      .then(() => {
        console.log("Post created successfully");
        setNewPost("");
        setImagePath("");
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={newPost}
        onChange={handleChange}
        placeholder="Type your post message here"
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Create Post</button>
    </div>
  );
};

export default CreatePost;
