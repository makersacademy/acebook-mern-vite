import React, { useState } from "react";
import { createNewPost } from "../../services/posts";

const CreatePost = () => {
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    setNewPost(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const postData = new FormData();
    postData.append("message", newPost);
    postData.append("image", image);

    createNewPost(token, postData)
      .then(() => {
        console.log("Post created successfully");
        setNewPost("");
        setImage(null);
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
