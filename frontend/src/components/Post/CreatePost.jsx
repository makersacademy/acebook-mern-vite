import React, { useState } from "react";
import { createNewPost } from "../../services/posts";

const CreatePost = () => {
  const [newPost, setNewPost] = useState("");
  const [postImage, setPostImage] = useState("");

  const handlePostChange = (event) => {
    setNewPost(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      setPostImage(base64Image);
    };
    reader.readAsDataURL(file);
    console.log("Selected file:", file); //WORKED!! Stored in DB
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const postData = {
      message: newPost,
      image: postImage,
    };

    createNewPost(token, postData)
      .then(() => {
        console.log("Post created successfully");
        setNewPost("");
        setPostImage("");
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
        onChange={handlePostChange}
        placeholder="Type your post message here"
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Create Post</button>
    </div>
  );
};

export default CreatePost;
